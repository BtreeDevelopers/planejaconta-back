import {
  IDeleteOperationServiceDTO,
  IUpdateOperationServiceDTO,
} from "@modules/operations/dtos/Operation";
import AppError from "@shared/errors/AppError";
import UUID from "@shared/utils/uuid";
import {
  ICreateOperationDTO,
  IDeleteOperationDTO,
  IHardDeleteOperationDTO,
  IListOperationDTO,
  IOperationDTO,
} from "../dtos/OperationDTO";
import IOperationRepository from "../models/IOperationRepository";
import Operation from "../schemas/Operation";

export default class OperationRepository implements IOperationRepository {
  async create({
    userId,
    operationType,
    name,
    classification,
    type,
    amount,
    operationAt,
    dueAt,
  }: ICreateOperationDTO): Promise<IOperationDTO> {
    const operation = await Operation.create({
      _id: new UUID().getV4(),
      userId,
      operationType,
      name,
      classification,
      type,
      amount,
      operationAt,
      dueAt,
    });

    return operation;
  }

  async list({
    filter,
    sort,
    asc,
  }: IListOperationDTO): Promise<IOperationDTO[]> {
    const operations = await Operation.find(filter).sort({ [sort]: asc });

    return operations;
  }

  async update({
    userId,
    operationId,
    operationType,
    name,
    classification,
    type,
    amount,
    operationAt,
    dueAt,
  }: IUpdateOperationServiceDTO): Promise<IOperationDTO | null> {
    const operation = await Operation.findOneAndUpdate(
      { _id: operationId, userId },
      {
        $set: {
          operationType,
          name,
          classification,
          type,
          amount,
          operationAt,
          dueAt: dueAt ?? null,
        },
      },
      { new: true }
    );

    return operation;
  }

  async hardDelete({ userId }: IHardDeleteOperationDTO): Promise<any | null> {
    try {
      const operationToDelete = await Operation.deleteMany({
        userId,
      });
      if (!operationToDelete) {
        console.log("Operation not find by Id");
        return null;
      }
    } catch (error) {
      console.error(
        "Error finding Operation by userId and Delete\nError: ",
        error
      );

      throw new AppError(
        `Error finding Operation by userId and Delete. Error: ${error}`
      );
    }
  }

  async delete({ _id }: IDeleteOperationDTO): Promise<void | null> {
    try {
      const operationToDelete = await Operation.findByIdAndDelete({
        _id,
      });

      if (!operationToDelete) {
        console.log("Operation not find by Id");
        return null;
      }
    } catch (error) {
      console.error("Error finding Operation by Id and Delete\nError: ", error);

      throw new AppError(
        `Error finding Operation by Id and Delete. Error: ${error}`
      );
    }
  }
}
