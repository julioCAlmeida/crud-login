import express from "express";
import cors from "cors"
import { Request, Response } from "express";

import { routes } from "./routes"
import { UPLOADS_FOLDER } from "./configs/upload";

const app = express()

app.use(express.json())
app.use(routes)
app.use("/files", express.static(UPLOADS_FOLDER))

app.use(cors ({
  origin: "http://localhost:3001",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
}))

app.get("/", (request: Request, response: Response) => {
  response.send("Olá server, tudo funcionando?!")
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))