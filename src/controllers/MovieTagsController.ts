import { prisma } from "../libs/prisma";
import { Request, Response } from "express";

interface TagsBody {
  name: string,
  notesId: string
}

interface AuthenticatedRequest extends Request {
  user: {
    id: string
  }
}

export class MovieTagsController {
  async index(request: Request, response: Response) {
    const userId = (request as AuthenticatedRequest).user.id;

    const findTags = await prisma.movie_tags.findMany({
      where: {
        userId
      }
    })

    return response.status(201).json(findTags) 
  }

  async create(request: Request, response: Response) {
    const { name, notesId } = request.body as TagsBody
    const userId = (request as AuthenticatedRequest).user.id;

    if(!userId) {
      return response.status(404).json("User not found")
    }

    await prisma.movie_tags.create({
      data: {
        name,
        user: { connect: { id: userId } },
        movie_notes: { connect: { id: notesId } }
      }
    })
    return response.json("Tags created successfully")
  }

}