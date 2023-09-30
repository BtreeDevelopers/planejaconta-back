import { ICallDTO, ICreateCallDTO } from "../dtos/CallDTO";

export default interface ICallRepository {
  create({ name, email, description }: ICreateCallDTO): Promise<ICallDTO>;
}
