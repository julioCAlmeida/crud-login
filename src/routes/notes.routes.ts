import { Router } from "express";
import { MovieNotesController } from "../controllers/MovieNotesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routesNotes = Router();

const movieNotesController = new MovieNotesController();

routesNotes.use(ensureAuthenticated);

routesNotes.post("/", movieNotesController.create);
routesNotes.get("/", movieNotesController.index);
routesNotes.delete("/:id", movieNotesController.delete);

export { routesNotes };