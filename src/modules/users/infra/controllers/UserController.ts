import CreateUserService from "@modules/users/services/CreateUserService";
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
}

export default UserController;
