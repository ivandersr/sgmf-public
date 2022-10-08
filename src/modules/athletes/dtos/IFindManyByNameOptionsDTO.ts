export default interface IFindManyOptionsDTO {
  text: string;
  skip?: number;
  take?: number;
  order?: {
    [key: string]: string;
  }
}
