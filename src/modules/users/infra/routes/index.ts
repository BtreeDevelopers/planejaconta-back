import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import PasswordController from "../controllers/PasswordController";
import UserController from "../controllers/UserController";

const userController = new UserController();
const passwordController = new PasswordController();

const userRoutes = Router();

userRoutes.post("/", userController.store);

userRoutes.post("/auth", userController.auth);

userRoutes.get("/", ensureAuthenticated, userController.find);

userRoutes.patch("/", ensureAuthenticated, userController.update);

userRoutes.get("/reset-password/:email", passwordController.reset);

userRoutes.patch("/register-password/:token", passwordController.register);

export default userRoutes;
