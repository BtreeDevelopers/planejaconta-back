import {
  IDeleteOperationServiceDTO,
  IUpdateOperationServiceDTO,
} from "@modules/operations/dtos/Operation";
import {
  ICreateOperationDTO,
  IDeleteOperationDTO,
  IHardDeleteOperationDTO,
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
  }: IHardDeleteOperationDTO): Promise<IOperationDTO | null>;

  delete({ _id }: IDeleteOperationDTO): Promise<void | null>;
}
