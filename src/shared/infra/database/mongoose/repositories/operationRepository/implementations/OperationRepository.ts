import UUID from "@shared/utils/uuid";
import {
  ICreateOperationDTO,
  IListOperationDTO,
  IOperationDTO,
} from "../dtos/OperationDTO";
import IOperationRepository from "../models/IOperationRepository";
import ICredentialRepository from "../models/IOperationRepository";
import Operation from "../schemas/Operation";
import Credential from "../schemas/Operation";

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
}
