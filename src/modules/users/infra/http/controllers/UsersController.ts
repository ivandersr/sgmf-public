import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "@modules/users/services/CreateUserService";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, name, password, phoneNumber, email } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      login,
      name,
      password,
      phoneNumber,
      email,
    });

    Reflect.deleteProperty(user, 'password');

    return response.status(201).json(user);
  }
}

export default UsersController;
