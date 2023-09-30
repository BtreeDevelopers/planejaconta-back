import { inject, injectable } from "tsyringe";
import { ICreateNewsletterServiceDTO } from "../dtos/Newsletter";
import INewsletterRepository from "@shared/infra/database/mongoose/repositories/newsletterRepository/models/INewsletterRepository";
import { INewsletterDTO } from "@shared/infra/database/mongoose/repositories/newsletterRepository/dtos/NewsletterDTO";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateNewsletterService {
  constructor(
    @inject("NewsletterRepository")
    private newsletterRepository: INewsletterRepository
  ) {}

  async execute({
    email,
  }: ICreateNewsletterServiceDTO): Promise<INewsletterDTO> {
    if (!email) {
      throw new AppError("O campo <email> é obrigatório.", 400);
    }

    const newsletter = await this.newsletterRepository
      .create({
        email,
      })
      .catch((error) => {
        throw new AppError("E-mail já cadastrado.", 409);
      });

    return newsletter;
  }
}

export default CreateNewsletterService;
