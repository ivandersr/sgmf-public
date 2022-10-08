import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      login,
      password,
    });

    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'email');
    Reflect.deleteProperty(user, 'phoneNumber');
    Reflect.deleteProperty(user, 'created_at');
    Reflect.deleteProperty(user, 'updated_at');

    return response.json({ user, token });
  }
}

export default SessionsController;
