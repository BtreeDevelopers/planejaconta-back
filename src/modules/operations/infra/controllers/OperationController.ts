import CreateOperationService from "@modules/operations/services/CreateOperationService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class OperationController {
  public async store(request: Request, response: Response) {
    const {
      userId,
      operationType,
      name,
      classification,
      type,
      amount,
      operationAt,
      dueAt,
    } = request.body;

    const createOperationService = container.resolve(CreateOperationService);

    const operation = await createOperationService.execute({
      userId,
      operationType,
      name,
      classification,
      type,
      amount,
      operationAt,
      dueAt,
    });

    return response.status(201).json({ operation });
  }

  // public async list(request: Request, response: Response) {
  //   const { user_id } = request.params;

  //   const findUserService = container.resolve(FindUserService);

  //   const user = await findUserService.execute(user_id);

  //   if (user) {
  //     return response.status(201).json({ user });
  //   }

  //   return response.status(204).end();
  // }
}

export default OperationController;
