export class ServerError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor() {
    this.name = "ServerError";
    this.message = "ServerError";
  }
}
