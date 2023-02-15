import { hash, compare } from "bcryptjs";
import { prisma } from "../libs/prisma";
//import { z } from "zod";
import { Request, Response } from "express"

// const typeUser = z.object({
//   name: z.string(),
//   email: z.string(),
//   password: z.string(),
//   avatar: z.string()
// })

// const typeUserWithOldPassword = z.object({
//   name: z.string(),
//   email: z.string(),
//   password: z.string(),
//   avatar: z.string(),
//   oldPassword: z.string()
// })

interface TypeUser {
  name: string,
  email: string,
  password: string,
  avatar: string
}

interface TypeUserWithOldPassword extends TypeUser {
  oldPassword: string
}

interface AuthenticatedRequest extends Request {
  user: { id: string }
}

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, avatar } = request.body as TypeUser

    const checkEmailExists = await prisma.user.findFirst({
      where: { email }
    })

    if(checkEmailExists) {
      return response.status(400).json("This email is already in use!")
    }
    const hashPassword = await hash(password, 8)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        avatar
      }
    })
    return response.json("Successfully registered user")
  }

  async update(request: Request, response: Response) {
    const { name, email, password, oldPassword, avatar } = request.body as TypeUserWithOldPassword
    const userId  = (request as AuthenticatedRequest).user.id

    const user = await prisma.user.findFirst({
      where: { id: userId }
    })
   
    if(!user) {
      return response.json("User not found")
    }

    const userUpdateEmail = await prisma.user.findFirst({
      where: { email }
    })

    if(userUpdateEmail && userUpdateEmail.id !== user.id) {
      return response.json("This email is already in use!")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.avatar = avatar ?? user.avatar;
    
    if(password && !oldPassword) {
      return response.status(400).json("You need to enter the old password to set the new password.")
    }

    if(password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password)

      if(!checkOldPassword){
        return response.json("The old password does not match")
      }
      user.password = await hash(password, 8)
    }

    await prisma.user.update({
      where: { id: userId }, 
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar
      }
    })
    return response.json("User updated")
  }

  async index(request: Request, response: Response) {
    const users = await prisma.user.findMany({
      include: {
        movie_notes: {
          select: {
            title: true,
            description: true,
            rating: true,
            movie_tags: {
              select: {
                name: true
              }
            },
          }
        },
      }
    })

    return response.json(users)
  }

}

