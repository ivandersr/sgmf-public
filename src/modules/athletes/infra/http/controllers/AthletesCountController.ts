import CountActiveAthletesService from "@modules/athletes/services/CountActiveAthletesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class AthletesCountController {
  public async index(request: Request, response: Response): Promise<Response> {
    const countActiveAthletes = container.resolve(CountActiveAthletesService);

    const activeAthletesNumber = await countActiveAthletes.execute();

    return response.status(200).json({ count: activeAthletesNumber });
  }
}
export default AthletesCountController;
