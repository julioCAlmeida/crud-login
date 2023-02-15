import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { z } from "zod";
import { compare } from "bcryptjs";

import authConfig from "../configs/auth";
import { sign } from "jsonwebtoken";

const typeUser = z.object({
  email: z.string(),
  password: z.string()
})

export class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = typeUser.parse(request.body)
    
    const user = await prisma.user.findFirst({ where: { email } })

    if(!user) {
      return response.status(401).json("Incorrect email and/or password")
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      return response.status(401).json("Incorrect email and/or password")
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token })
  }
}