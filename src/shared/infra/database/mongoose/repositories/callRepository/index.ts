import { container } from "tsyringe";
import CallRepository from "./implementations/CallRepository";
import ICallRepository from "./models/ICallRepository";

container.registerSingleton<ICallRepository>("CallRepository", CallRepository);
