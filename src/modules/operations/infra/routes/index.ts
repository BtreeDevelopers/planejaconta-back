import { Router } from "express";
import OperationController from "../controllers/OperationController";

const operationController = new OperationController();

const operationRoutes = Router();

operationRoutes.post("/", operationController.store);

// operationRoutes.get("/auth", operationController.list);

export default operationRoutes;
