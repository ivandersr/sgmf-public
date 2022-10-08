class AppError {
  statusCode: number;

  message: string;

  constructor(statusCode: number = 400, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default AppError;
