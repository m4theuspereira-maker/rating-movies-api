export class BusinessError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name = "BusinessError";
    this.message = "BusinessError";
  }
}
