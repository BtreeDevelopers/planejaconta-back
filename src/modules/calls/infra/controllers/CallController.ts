import CreateCallService from "@modules/calls/services/CreateCallService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CallController {
  public async store(request: Request, response: Response) {
    const { name, email, description } = request.body;

    const createCallService = container.resolve(CreateCallService);

    const call = await createCallService.execute({
      name,
      email,
      description,
    });

    return response.status(201).json({ call });
  }
}

export default CallController;
