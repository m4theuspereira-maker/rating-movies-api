export class AuthenticationError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = "AuthenticationError";
    this.message = "AuthenticationError";
  }
}
