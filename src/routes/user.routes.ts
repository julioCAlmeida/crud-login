import { Router } from "express";
import multer, { StorageEngine } from "multer";
import { MULTER } from "../configs/upload";
import { Request, Response } from "express"

import { UserController } from "../controllers/UserController";
import { UserAvatarController } from "../controllers/UserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routesUser = Router()

const storage: StorageEngine = MULTER.Storage;
const upload = multer({
  storage: storage
});

const userController = new UserController()
const userAvatarController = new UserAvatarController()

routesUser.post("/", userController.create)
routesUser.put("/", ensureAuthenticated, userController.update)
routesUser.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

routesUser.get("/", userController.index)

export { routesUser }