import {
  IDeleteOperationServiceDTO,
  IUpdateOperationServiceDTO,
} from "@modules/operations/dtos/Operation";
import AppError from "@shared/errors/AppError";
import UUID from "@shared/utils/uuid";
import {
  ICreateOperation2DTO,
  ICreateOperationDTO,
  IDeleteOperationDTO,
  IHardDeleteOperationDTO,
  IListOperationDTO,
  IOperationDTO,
} from "../dtos/OperationDTO";
import IOperationRepository from "../models/IOperationRepository";
import Operation from "../schemas/Operation";
import CreateOperationService from "@modules/operations/services/CreateOperationService";
import { container } from "tsyringe";

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

  async createMany(data: ICreateOperation2DTO[]): Promise<IOperationDTO[]> {
    return Operation.insertMany(data);
  }
  async list({
    filter,
    sort,
    asc,
  }: IListOperationDTO): Promise<IOperationDTO[]> {
    const operations = await Operation.find(filter).sort({ [sort]: asc });

    return operations;
  }
  /**
  {
        $group: {
          _id: "$userId",
          totalMesPassado: {
            $sum: {
              $cond: [
                { $eq: ["$operationType", 1] },
                "$amount",
                { $multiply: ["$amount", -1] },
              ],
            },
          },
        },
      },
 */
  async aggregate({ filter }: IListOperationDTO): Promise<IOperationDTO[]> {
    const listUser = await Operation.find()
      .sort({ userId: 1 })
      .distinct("userId");

    const operations = await Operation.aggregate([
      {
        $match: {
          $and: [
            { userId: { $in: listUser } },
            {
              operationAt: {
                $gte: new Date("2023-06-01T00:00:00Z"),
                $lte: new Date("2023-06-30T23:59:59Z"),
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$userId",
          totalMesPassado: {
            $sum: {
              $cond: [
                { $eq: ["$operationType", 1] },
                "$amount",
                { $multiply: ["$amount", -1] },
              ],
            },
          },
        },
      },
    ]);
    console.log(operations);

    const createOperationService = container.resolve(CreateOperationService);
    //console.log(operation);

    for await (const element of operations) {
      if (element.totalMesPassado !== 0) {
        const dateOpAt = new Date();
        let valorABS = Math.abs(element.totalMesPassado);
        await createOperationService.execute({
          userId: element._id,
          operationType: element.totalMesPassado > 0 ? 1 : 0,
          name: "Saldo Mês Anterior",
          classification: 1,
          type: "Outro(s)",
          amount: valorABS,
          operationAt: dateOpAt,
          dueAt: undefined,
        });
      }
    }

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

  async delete({ _id }: IDeleteOperationDTO): Promise<any> {
    try {
      if (!_id || _id === "") {
        console.log("Operation not find by Id " + _id);
        throw new AppError(`Operation not find by Id`);
      }
      const operationToDelete = await Operation.findByIdAndDelete(_id);
      console.log({ operationToDelete, _id });
      return operationToDelete;
    } catch (error) {
      console.error("Error finding Operation by Id and Delete\nError: ", error);

      throw new AppError(
        `Error finding Operation by Id and Delete. Error: ${error}`
      );
    }
  }
}
