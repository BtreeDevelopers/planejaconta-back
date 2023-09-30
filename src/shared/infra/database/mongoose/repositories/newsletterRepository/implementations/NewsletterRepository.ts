import UUID from "@shared/utils/uuid";
import { ICreateNewsletterDTO, INewsletterDTO } from "../dtos/NewsletterDTO";
import INewsletterRepository from "../models/INewsletterRepository";
import Newsletter from "../schemas/Newsletter";

export default class NewsletterRepository implements INewsletterRepository {
  async create({ email }: ICreateNewsletterDTO): Promise<INewsletterDTO> {
    const newsletter = await Newsletter.create({
      _id: new UUID().getV4(),
      email,
    });

    return newsletter;
  }
}
