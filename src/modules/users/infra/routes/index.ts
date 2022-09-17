import { Router } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();

const userRoutes = Router();

userRoutes.post("/", userController.store);

userRoutes.get("/:user_id", userController.find);

export default userRoutes;
