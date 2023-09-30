import CreateNewsletterService from "@modules/newsletter/services/CreateNewsletterService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class NewsletterController {
  public async store(request: Request, response: Response) {
    const { email } = request.body;

    const createNewsletterService = container.resolve(CreateNewsletterService);

    const Newsletter = await createNewsletterService.execute({
      email,
    });

    return response.status(201).json({ Newsletter });
  }
}

export default NewsletterController;
