import {
  ICreateOperationDTO,
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
}
