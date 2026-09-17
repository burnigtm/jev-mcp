export class JevConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JevConfigError";
  }
}

export class JevValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JevValidationError";
  }
}

export function errorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}
