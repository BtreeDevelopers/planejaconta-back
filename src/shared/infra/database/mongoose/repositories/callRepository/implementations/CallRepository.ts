import UUID from "@shared/utils/uuid";
import { ICreateCallDTO, ICallDTO } from "../dtos/CallDTO";
import ICallRepository from "../models/ICallRepository";
import Call from "../schemas/Call";

export default class CallRepository implements ICallRepository {
  async create({
    name,
    email,
    description,
  }: ICreateCallDTO): Promise<ICallDTO> {
    const call = await Call.create({
      _id: new UUID().getV4(),
      name,
      email,
      description,
    });

    return call;
  }
}
