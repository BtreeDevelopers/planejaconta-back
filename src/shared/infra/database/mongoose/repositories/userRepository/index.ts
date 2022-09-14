import { container } from "tsyringe";
import UserRepository from "./implementations/UserRepository";
import IUserRepository from "./models/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
