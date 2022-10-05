import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();

const userRoutes = Router();

userRoutes.post("/", userController.store);

userRoutes.post("/auth", userController.auth);

userRoutes.get("/", ensureAuthenticated, userController.find);

userRoutes.patch("/", ensureAuthenticated, userController.update);

export default userRoutes;
