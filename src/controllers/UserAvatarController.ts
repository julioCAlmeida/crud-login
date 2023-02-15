import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { DiskStorage } from "../providers/DiskStorage";

interface AuthenticatedRequest extends Request {
  user: {
    id: string
  }
}

export class UserAvatarController {
  async update(request: Request, response: Response) {
    const userId = (request as AuthenticatedRequest).user.id
    const avatarFilename = request.file?.filename

    const diskStorage = new DiskStorage()

    const user = await prisma.user.findFirst({
      where: { id: userId }
    })
    
    if(!user) {
      return response.json("only authenticated users can change avatar")
    }
    
    if(!avatarFilename) {
      return response.status(400).send('No file was uploaded.');
    }

    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    await prisma.user.update({
      where: { id: userId },
      data: { avatar: user.avatar }
    })

    return response.json(user)
  }
}