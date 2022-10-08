export default interface IFindManyByDescriptionOptionsDTO {
  text: string;
  skip?: number;
  take?: number;
  order?: {
    [key: string]: string;
  }
}
