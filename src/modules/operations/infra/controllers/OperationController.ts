import CreateOperationService from "@modules/operations/services/CreateOperationService";
import HardDeleteOperationService from "@modules/operations/services/HardDeleteOperationService";
import ListOperationService from "@modules/operations/services/ListOperationService";
import UpdateOperationService from "@modules/operations/services/UpdateOperationService";
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

  public async list(request: Request, response: Response) {
    const { typeFilter, valueFilter, sort, asc } = request.query;
    const userId = request.user.id;

    const listOperationService = container.resolve(ListOperationService);

    const operations = await listOperationService.execute({
      typeFilterRaw: typeFilter,
      valueFilterRaw: valueFilter,
      sortRaw: sort,
      ascRaw: asc,
      userId,
    });

    return response.status(200).json({ operations });
  }

  public async update(request: Request, response: Response) {
    const {
      operationType,
      name,
      classification,
      type,
      amount,
      operationAt,
      dueAt,
    } = request.body;

    const userId = request.user.id;

    const { operationId } = request.params;

    const updateOperationService = container.resolve(UpdateOperationService);

    const operation = await updateOperationService.execute({
      operationType,
      name,
      classification,
      type,
      amount,
      operationAt,
      dueAt,
      userId,
      operationId,
    });

    return response.status(200).json({ operation });
  }

  public async hardDelete(request: Request, response: Response) {
    const userId = request.user.id;

    const { operationId } = request.params;

    const hardDeleteOperationService = container.resolve(
      HardDeleteOperationService
    );

    await hardDeleteOperationService.execute({
      userId,
      operationId,
    });

    return response.status(200).end();
  }
}

export default OperationController;
