export default interface IFindManyOptionsDTO {
  skip?: number;
  take?: number;
  order?: {
    [key: string]: string;
  };
}
