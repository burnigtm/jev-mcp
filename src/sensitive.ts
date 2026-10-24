/**
 * Paths whose content must never be sent to the provider. A superset of the skill's evidence collector
 * (`skills/jev-mcp/scripts/evidence.mjs`), widened to key material, credential stores and cloud
 * configuration. Case-insensitive; Windows separators are accepted.
 */

const SENSITIVE: RegExp[] = [
  /(^|\/)\.git(\/|$)/,
  /(^|\/)\.task-evidence(\/|$)/,
  /(^|\/)\.env(?!\.example$|\.sample$|\.template$)(\.|$)/,
  /\.pem$/,
  /(^|\/)\.jev-connection\.json$/,
  /(^|\/)id_(rsa|dsa|ecdsa|ed25519)(\.pub)?$/,
  /(^|\/)id_(rsa|dsa|ecdsa|ed25519)[^/]*$/,
  /\.(key|p12|pfx|jks|keystore|ppk|gpg|asc)$/,
  /(^|\/)\.npmrc$/,
  /(^|\/)\.pypirc$/,
  /(^|\/)\.netrc$/,
  /(^|\/)\.pgpass$/,
  /(^|\/)\.git-credentials$/,
  /(^|\/)credentials([._-][^/]*)?$/,
  /(^|\/)\.aws(\/|$)/,
  /(^|\/)\.ssh(\/|$)/,
  /(^|\/)\.gnupg(\/|$)/,
  /(^|\/)\.kube(\/|$)/,
  /(^|\/)\.docker\/config\.json$/,
  /(^|\/)secrets?\.(json|ya?ml|toml|env)$/,
  /(^|\/)terraform\.tfstate(\.backup)?$/,
  /\.tfvars$/,
];

/** True for a repository-relative path that must not be sent to a provider. */
export function isSensitivePath(path: string): boolean {
  const normalized = path.replace(/\\/g, "/").replace(/^\.\//, "").toLowerCase();
  return SENSITIVE.some(pattern => pattern.test(normalized));
}
