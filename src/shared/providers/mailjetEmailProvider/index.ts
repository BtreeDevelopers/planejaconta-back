import { container } from "tsyringe";
import MailjetEmailProvider from "./implementations/MailjetEmailProvider";
import IMailjetEmailProvider from "./models/IMailjetEmailProvider";

container.registerSingleton<IMailjetEmailProvider>(
  "MailjetEmailProvider",
  MailjetEmailProvider
);
