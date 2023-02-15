import { Router } from "express";
import { routesUser } from "./user.routes";
import { routesNotes } from "./notes.routes";
import { routesTags } from "./tags.routes";
import { routesSessions } from "./sessions.routes";

const routes = Router()

routes.use("/user", routesUser)
routes.use("/sessions", routesSessions)
routes.use("/notes", routesNotes)
routes.use("/tags", routesTags)

export { routes }