import { Router } from "express";
import NewsletterController from "../controllers/NewsletterController";

const newsletterController = new NewsletterController();

const newsletterRoutes = Router();

newsletterRoutes.post("/", newsletterController.store);

export default newsletterRoutes;
