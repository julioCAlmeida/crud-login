import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";
import { Request, Response, NextFunction } from "express";

interface User {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user: User;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.status(401).json({error: "JWT Token not reported"});
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, authConfig.jwt.secret);

    const user: User = { id: String(userId)};

    (request as AuthenticatedRequest).user = user;

    return next()
  } catch (error) {
    return response.status(401).json({ error: "JWT Token invalid"});
  }
}