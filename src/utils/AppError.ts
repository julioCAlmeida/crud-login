class AppError {
  message: String;
  statusCode: Number;

  constructor(message: string, statuscode = 400) {
    this.message = message;
    this.statusCode = statuscode
  }
}

export { AppError }