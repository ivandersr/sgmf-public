import AppError from "@shared/errors/AppError";

export default class Formatter {
  public static formatDate(date: string): Date {
    const [day, month, year] = date.split('/');
    if (isNaN(Number(day) || Number(month) || Number(year))) {
      throw new AppError(400, 'A data deve estar no formato DD/MM/yyyy');
    }
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
}
