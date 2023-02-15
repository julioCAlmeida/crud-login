import { prisma } from "../libs/prisma";
import { z } from "zod";
import { Request, Response } from "express";

const typeIdNote = z.object({
  id: z.string()
})

interface NotesBody {
  title: string;
  description: string;
  rating: number
}

interface TagsBody {
  tags: {
    name: string
  }[],
}

interface AuthenticatedRequest extends Request {
  user: { id: string }
}

export class MovieNotesController {
  async create(request: Request, response: Response) {
    const { title, description, rating } = request.body as NotesBody
    const { tags } = request.body as TagsBody
    const userId = (request as AuthenticatedRequest).user.id

    if(!userId) {
      return response.status(404).json("User not found")
    }
    
    try {
     const movie = await prisma.movie_notes.create({
        data: {
          title,
          description,
          rating,
          user: { connect: { id: userId } }
        }  
      })

      const getTags = tags.map(tag => {
        return {
          name: tag.name,
          user: { connect: { id: userId } },
          movie_notes: { connect: { id: movie.id } }
        }
      })
      console.log(getTags)

      // await prisma.movie_tags.create({
      //   data: {
      //     name: getTags.name
      //   }
      // })

  
      return response.json("Register created successfully")
      
    } catch (error) {
      return response.status(500).json(`error in calling the data on the server, ${error}`)
    }
  }

  async index(request: Request, response: Response) {
    const userId = (request as AuthenticatedRequest).user.id

    const note = await prisma.movie_notes.findMany({ where: { userId } })
    
    return response.json(note)
  }

  async delete(request: Request, response: Response) {
    const { id } = typeIdNote.parse(request.params)

    await prisma.movie_tags.delete({ where: { id } })

    return response.json("Deleted note")
  }
}