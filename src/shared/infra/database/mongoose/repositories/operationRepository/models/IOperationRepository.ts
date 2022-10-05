import { IUpdateOperationServiceDTO } from "@modules/operations/dtos/Operation";
import {
  ICreateOperationDTO,
  IDeleteOperationDTO,
  IListOperationDTO,
  IOperationDTO,
} from "../dtos/OperationDTO";

export default interface IOperationRepository {
  create({
    userId,
    operationType,
    name,
    classification,
    type,
    amount,
    operationAt,
    dueAt,
  }: ICreateOperationDTO): Promise<IOperationDTO>;

  list({ filter, sort, asc }: IListOperationDTO): Promise<IOperationDTO[]>;

  update({
    userId,
    operationId,
    operationType,
    name,
    classification,
    type,
    amount,
    operationAt,
    dueAt,
  }: IUpdateOperationServiceDTO): Promise<IOperationDTO | null>;

  hardDelete({
    userId,
    operationId,
  }: IDeleteOperationDTO): Promise<IOperationDTO | null>;
}
