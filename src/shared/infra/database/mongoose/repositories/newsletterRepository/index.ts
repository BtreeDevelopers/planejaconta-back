import { container } from "tsyringe";
import NewsletterRepository from "./implementations/NewsletterRepository";
import INewsletterRepository from "./models/INewsletterRepository";

container.registerSingleton<INewsletterRepository>(
  "NewsletterRepository",
  NewsletterRepository
);
