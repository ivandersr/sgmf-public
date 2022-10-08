import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IRequest, IResponse } from "../dtos/IFindByNameWithPaginationDTO";
import IAthletesRepository from "../repositories/IAthletesRepository";

@injectable()
class FindAthletesByNameService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,
  ) { }

  public async execute(
    { text, page, pageSize }: IRequest
  ): Promise<IResponse> {
    if (!text) {
      if (!page || !pageSize) {
        const [athletes, total] = await this.athletesRepository.findAndCount();
        return { athletes, total, pages: 1 };
      }

      if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
        throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
      }

      const [athletes, total] = await this.athletesRepository.findAndCount({
        skip: Number(page) * Number(pageSize),
        take: Number(pageSize),
        order: {
          active: 'DESC',
          name: 'ASC',
        },
      });

      const pages = Math.ceil(total / Number(pageSize));

      return { athletes, total, pages };
    }


    if (!page || !pageSize) {
      const [athletes, total] = await this.athletesRepository.findByName({
        text
      });
      return { athletes, total, pages: 1 };
    }
    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
    }

    const [athletes, total] = await this.athletesRepository.findByName({
      text,
      skip: Number(page) * Number(pageSize),
      take: Number(pageSize),
      order: {
        active: 'DESC',
        name: 'ASC',
      },
    });

    const pages = Math.ceil(total / Number(pageSize));

    return { athletes, total, pages };
  }
}

export default FindAthletesByNameService;
