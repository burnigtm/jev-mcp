import type { DiffFile, ParsedDiff } from "./diff.js";
import { estimateTokens } from "./limits.js";

/**
 * Plan a review of a diff too large for one Jev request. The plan splits the diff along file
 * boundaries (hunks, then lines, only for a file that cannot fit alone), keeps a source file next to
 * its test, and records what the split cannot see: a contract change, a lockfile, a binary file, an
 * unpaired source change. Those become a deterministic floor of `review`. Nothing here is a judgment.
 */

export type FloorReason =
  | "unpaired_source_change"
  | "export_signature_change"
  | "lockfile_changed"
  | "binary_file_changed"
  | "partial_file_review"
  | "diff_too_large";

export type IndexEntry = { path: string; status: DiffFile["status"]; binary: boolean; additions: number; deletions: number };

export type Chunk = {
  files: string[];
  /** True when any file in the chunk is shown in part only. */
  partial: boolean;
  diff: string;
};

export type ChunkPlan = {
  chunks: Chunk[];
  /** Files in chunks beyond the cap; they were not reviewed. */
  omitted: string[];
  floors: FloorReason[];
  index: IndexEntry[];
};

export type PlanOptions = {
  /** Estimated tokens a chunk's diff text may occupy after the fixed parts of the state. */
  budgetTokens: number;
  maxChunks: number;
};

const TEST_DIR = /(^|\/)(tests?|__tests__|specs?)\//i;
const TEST_NAME = /([._-])(test|spec)\.[^./]+$|(^|\/)test_[^/]+$|_test\.[^./]+$/i;
const SOURCE_EXT = /\.(?:[cm]?[jt]sx?|py|go|rs|java|kt|rb|php|cs|cpp|cc|c|h|hpp|swift|scala|sh|ps1)$/i;
const LOCKFILES = new Set([
  "package-lock.json", "npm-shrinkwrap.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb", "bun.lock", "cargo.lock", "go.sum",
  "poetry.lock", "pipfile.lock", "gemfile.lock", "composer.lock", "uv.lock", "mix.lock", "packages.lock.json", "flake.lock",
]);
const DECLARATION = /^(?:export\s|pub(?:\([^)]*\))?\s|public\s|module\.exports|exports\.|(?:async\s+)?def\s+[A-Za-z]|func\s+(?:\([^)]*\)\s*)?[A-Z]|class\s+[A-Za-z]|interface\s|type\s+[A-Z])/;

export function isTestFile(path: string): boolean {
  return TEST_DIR.test(path) || TEST_NAME.test(path);
}

export function isSourceFile(path: string): boolean {
  return SOURCE_EXT.test(path) && !isTestFile(path);
}

function basename(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1);
}

/** `src/tools/review.ts` and `tests/review.test.ts` share the stem `review`. */
export function pairStem(path: string): string {
  const name = basename(path).toLowerCase().replace(/\.[^.]+$/, "");
  return name.replace(/[._-](test|spec)$/, "").replace(/^test[_-]/, "");
}

function textTokens(text: string): number {
  // The state is serialized as JSON, so the escaped form is what counts against the budget.
  return estimateTokens(JSON.stringify(text).slice(1, -1));
}

function substantive(line: string): boolean {
  const content = line.slice(1).trim();
  return content.length > 0 && !/^(?:\/\/|#|\*|\/\*|--|<!--)/.test(content);
}

function changedLines(file: DiffFile, sign: "+" | "-"): string[] {
  return file.hunks.flatMap(hunk => hunk.split(/\r?\n/).filter(line => line.startsWith(sign) && !line.startsWith("\\")));
}

function normalizeDeclaration(line: string): string {
  return line.slice(1).trim().replace(/\s+/g, " ");
}

/** A removed or rewritten public declaration: its callers are probably in another chunk. */
function changesPublicDeclaration(file: DiffFile): boolean {
  const added = new Set(changedLines(file, "+").map(normalizeDeclaration));
  return changedLines(file, "-").some(line => {
    const declaration = normalizeDeclaration(line);
    return DECLARATION.test(declaration) && !added.has(declaration);
  });
}

function hasSubstantiveChange(file: DiffFile): boolean {
  return changedLines(file, "+").some(substantive) || changedLines(file, "-").some(substantive);
}

export function fileFloors(files: DiffFile[]): FloorReason[] {
  const floors = new Set<FloorReason>();
  const testStems = new Set(files.filter(file => isTestFile(file.path)).map(file => pairStem(file.path)));
  for (const file of files) {
    if (file.binary) floors.add("binary_file_changed");
    if (LOCKFILES.has(basename(file.path).toLowerCase())) floors.add("lockfile_changed");
    if (!isSourceFile(file.path) || file.binary) continue;
    if (changesPublicDeclaration(file)) floors.add("export_signature_change");
    if (hasSubstantiveChange(file) && !testStems.has(pairStem(file.path))) floors.add("unpaired_source_change");
  }
  return [...floors];
}

/** The text of one file as the model sees it. Binary content is never sent. */
function fileText(file: DiffFile): string {
  if (!file.binary) return file.header + file.hunks.join("");
  const lines = file.header.split(/(?<=\n)/);
  const cut = lines.findIndex(line => line.replace(/\r?\n$/, "") === "GIT binary patch");
  const kept = cut === -1 ? lines : lines.slice(0, cut);
  return `${kept.join("")}Binary file changed; patch content omitted.\n`;
}

type Piece = { path: string; text: string; tokens: number; partial: boolean };

function whole(file: DiffFile): Piece {
  const text = fileText(file);
  return { path: file.path, text, tokens: textTokens(text), partial: false };
}

/** Split one oversized file: by hunks first, then by lines inside a hunk that is itself too large. */
function splitFile(file: DiffFile, budget: number): Piece[] {
  const header = file.binary ? fileText(file) : file.header;
  const headerTokens = textTokens(header);
  const room = Math.max(1, budget - headerTokens);
  const pieces: Piece[] = [];
  let group: string[] = [];
  let groupTokens = 0;
  const flush = () => {
    if (group.length === 0) return;
    const text = header + group.join("");
    pieces.push({ path: file.path, text, tokens: textTokens(text), partial: true });
    group = [];
    groupTokens = 0;
  };
  for (const hunk of file.hunks) {
    const hunkTokens = textTokens(hunk);
    if (hunkTokens > room) {
      flush();
      const parts = splitLines(hunk, room);
      parts.forEach((part, index) => {
        const label = `@@ part ${index + 1} of ${parts.length} of an oversized hunk @@\n`;
        const text = header + label + part;
        pieces.push({ path: file.path, text, tokens: textTokens(text), partial: true });
      });
      continue;
    }
    if (groupTokens + hunkTokens > room) flush();
    group.push(hunk);
    groupTokens += hunkTokens;
  }
  flush();
  if (pieces.length === 0) pieces.push({ path: file.path, text: header, tokens: headerTokens, partial: true });
  return pieces;
}

/** Cut text on line boundaries to at most `room` tokens; a single line longer than that is cut by characters. */
function splitLines(text: string, room: number): string[] {
  const parts: string[] = [];
  let current = "";
  let currentTokens = 0;
  const push = () => {
    if (current) parts.push(current);
    current = "";
    currentTokens = 0;
  };
  for (const line of text.split(/(?<=\n)/)) {
    const tokens = textTokens(line);
    if (tokens > room) {
      push();
      const step = Math.max(1, room * 3);
      for (let at = 0; at < line.length; at += step) parts.push(line.slice(at, at + step));
      continue;
    }
    if (currentTokens + tokens > room) push();
    current += line;
    currentTokens += tokens;
  }
  push();
  return parts;
}

/** Source files next to their tests, otherwise the diff's own order. */
function orderedGroups(files: DiffFile[]): DiffFile[][] {
  const groups = new Map<string, DiffFile[]>();
  for (const file of files) {
    const key = pairStem(file.path);
    const group = groups.get(key);
    if (group) group.push(file);
    else groups.set(key, [file]);
  }
  return [...groups.values()];
}

export function fileIndex(parsed: ParsedDiff): IndexEntry[] {
  return parsed.files.map(file => ({
    path: file.path, status: file.status, binary: file.binary, additions: file.additions, deletions: file.deletions,
  }));
}

export function planChunks(parsed: ParsedDiff, options: PlanOptions): ChunkPlan {
  const budget = Math.max(1, options.budgetTokens);
  const floors = new Set<FloorReason>(fileFloors(parsed.files));
  const index = fileIndex(parsed);

  const chunks: Array<{ pieces: Piece[]; tokens: number }> = [];
  let current: { pieces: Piece[]; tokens: number } = { pieces: [], tokens: 0 };
  const flush = () => {
    if (current.pieces.length > 0) chunks.push(current);
    current = { pieces: [], tokens: 0 };
  };
  const add = (piece: Piece) => {
    if (current.tokens + piece.tokens > budget) flush();
    current.pieces.push(piece);
    current.tokens += piece.tokens;
  };

  for (const group of orderedGroups(parsed.files)) {
    const pieces = group.map(whole);
    const groupTokens = pieces.reduce((sum, piece) => sum + piece.tokens, 0);
    if (groupTokens <= budget) {
      // A pair stays together: start a new chunk rather than separate a source file from its test.
      if (current.tokens + groupTokens > budget) flush();
      for (const piece of pieces) add(piece);
      continue;
    }
    group.forEach((file, i) => {
      const piece = pieces[i]!;
      if (piece.tokens <= budget) add(piece);
      else {
        flush();
        for (const part of splitFile(file, budget)) {
          add(part);
          flush();
        }
      }
    });
  }
  flush();

  const kept = chunks.slice(0, options.maxChunks);
  const dropped = chunks.slice(options.maxChunks);
  if (dropped.length > 0) floors.add("diff_too_large");
  const result: Chunk[] = kept.map(chunk => ({
    files: [...new Set(chunk.pieces.map(piece => piece.path))],
    partial: chunk.pieces.some(piece => piece.partial),
    diff: chunk.pieces.map(piece => piece.text).join(""),
  }));
  if (result.some(chunk => chunk.partial)) floors.add("partial_file_review");
  // A file split across kept and dropped chunks is listed too: its dropped part was not reviewed.
  const omitted = [...new Set(dropped.flatMap(chunk => chunk.pieces.map(piece => piece.path)))];
  return { chunks: result, omitted, floors: [...floors], index };
}
