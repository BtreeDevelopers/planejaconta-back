import Mailjet from "node-mailjet";
import IMailjetEmailProvider from "../models/IMailjetEmailProvider";
import { ISendEmailDTO } from "../dtos/Data";
import { MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC } from "@config/constants";

export default class mailjetEmailProvider implements IMailjetEmailProvider {
  async sendEmail(data: ISendEmailDTO): Promise<void> {
    const mailjet = new Mailjet({
      apiKey: MJ_APIKEY_PUBLIC,
      apiSecret: MJ_APIKEY_PRIVATE,
    });

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "btreedevs@gmail.com",
            Name: "Btree",
          },
          To: [
            {
              Email: data.email,
              Name: data.name,
            },
          ],
          Subject: data.subject,
          HTMLPart: data.htmlPart,
          CustomID: "AppGettingStartedTest",
        },
      ],
    });

    await request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });
  }
}
