import { ISendEmailDTO } from "../dtos/Data";

export default interface IMailjetEmailProvider {
  sendEmail(data: ISendEmailDTO): Promise<void>;
}
