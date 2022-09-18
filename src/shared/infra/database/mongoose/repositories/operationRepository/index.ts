import { container } from "tsyringe";
import OperationRepository from "./implementations/OperationRepository";
import IOperationRepository from "./models/IOperationRepository";

container.registerSingleton<IOperationRepository>(
  "OperationRepository",
  OperationRepository
);
