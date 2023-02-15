import { Router } from "express";
import { SessionsController } from "../controllers/SessionsController";

const routesSessions = Router()

const sessionsController = new SessionsController()

routesSessions.post("/", sessionsController.create)

export { routesSessions }

