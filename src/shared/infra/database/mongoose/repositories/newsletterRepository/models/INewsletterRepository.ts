import { INewsletterDTO, ICreateNewsletterDTO } from "../dtos/NewsletterDTO";

export default interface INewsletterRepository {
  create({ email }: ICreateNewsletterDTO): Promise<INewsletterDTO>;
}
