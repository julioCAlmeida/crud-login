import { Router } from "express";
import { MovieTagsController } from './../controllers/MovieTagsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routesTags = Router()

const movieTagsController = new MovieTagsController()

routesTags.use(ensureAuthenticated)
routesTags.get("/", movieTagsController.index)
routesTags.post("/", movieTagsController.create)

export { routesTags }