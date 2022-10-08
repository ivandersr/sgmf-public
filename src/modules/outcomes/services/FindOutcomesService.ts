import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IRequest, IResponse } from "../dtos/IFindByDescriptionWithPaginationDTO";
import IOutcomesRepository from "../repositories/IOutcomesRepository";


@injectable()
class FindOutcomesService {
  constructor(
    @inject('OutcomesRepository')
    private outcomesRepository: IOutcomesRepository,
  ) { }

  public async execute({
    text,
    page,
    pageSize
  }: IRequest): Promise<IResponse> {
    if (!text) {
      if (!page || !pageSize) {
        const [outcomes, total] = await this.outcomesRepository.findAndCount();
        return { outcomes, total, pages: 1 };
      }

      if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
        throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
      }

      const [outcomes, total] = await this.outcomesRepository.findAndCount({
        skip: Number(page) * Number(pageSize),
        take: Number(pageSize),
        order: {
          description: 'ASC',
        },
      });

      const pages = Math.ceil(total / Number(pageSize));

      return { outcomes, total, pages };
    }


    if (!page || !pageSize) {
      const [
        outcomes, total
      ] = await this.outcomesRepository.findByDescription({
        text
      });
      return { outcomes, total, pages: 1 };
    }
    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new AppError(400, 'A página e seu tamanho devem ser numéricos');
    }

    const [outcomes, total] = await this.outcomesRepository.findByDescription({
      text,
      skip: Number(page) * Number(pageSize),
      take: Number(pageSize),
      order: {
        description: 'ASC',
      },
    });

    const pages = Math.ceil(total / Number(pageSize));

    return { outcomes, total, pages };
  }
}


export default FindOutcomesService;
