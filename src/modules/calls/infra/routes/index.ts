import { Router } from "express";
import CallController from "../controllers/CallController";

const callController = new CallController();

const callRoutes = Router();

callRoutes.post("/", callController.store);

export default callRoutes;
