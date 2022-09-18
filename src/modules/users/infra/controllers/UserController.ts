import AuthUserService from "@modules/users/services/AuthUserService";
import CreateUserService from "@modules/users/services/CreateUserService";
import FindUserService from "@modules/users/services/FindUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class UserController {
  public async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({ name, email, password });

    return response
      .status(201)
      .json({ message: "Usuário criado com sucesso." });
  }

  public async find(request: Request, response: Response) {
    const { user_id } = request.params;

    const findUserService = container.resolve(FindUserService);

    const user = await findUserService.execute(user_id);

    if (user) {
      return response.status(201).json({ user });
    }

    return response.status(204).end();
  }

  public async auth(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthUserService);

    const result = await authUserService.execute({ email, password });

    return response.status(200).json(result);
  }
}

export default UserController;
