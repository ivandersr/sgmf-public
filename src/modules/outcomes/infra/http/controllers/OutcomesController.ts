import CreateOutcomeService from "@modules/outcomes/services/CreateOutcomeService";
import DeleteOutcomeService from "@modules/outcomes/services/DeleteOutcomeService";
import FindOutcomeService from "@modules/outcomes/services/FindOutcomeService";
import FindOutcomesService from "@modules/outcomes/services/FindOutcomesService";
import UpdateOutcomeService from "@modules/outcomes/services/UpdateOutcomeService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class OutcomesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { text, page, pageSize } = request.query;

    const findOutcomes = container.resolve(FindOutcomesService);

    const outcomes = await findOutcomes.execute({
      text: String(text),
      page: String(page),
      pageSize: String(pageSize),
    });

    return response.status(200).json(outcomes);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOutcome = container.resolve(FindOutcomeService);

    const outcome = await findOutcome.execute({
      id
    });

    return response.status(200).json(outcome);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, value, dueDate } = request.body;

    const createOutcome = container.resolve(CreateOutcomeService);

    const outcome = await createOutcome.execute({
      description,
      value,
      dueDate,
    });

    return response.status(201).json(outcome);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description, value, dueDate } = request.body;

    const updateOutcome = container.resolve(UpdateOutcomeService);

    const updatedOutcome = await updateOutcome.execute({
      id,
      description,
      value,
      dueDate,
    });

    return response.status(200).json(updatedOutcome);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOutcome = container.resolve(DeleteOutcomeService);

    await deleteOutcome.execute({ id });

    return response.status(204).send();
  }
}

export default OutcomesController
