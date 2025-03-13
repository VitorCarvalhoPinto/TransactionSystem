import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ error: "Token não fornecido" });
    return ;
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.user = decoded
    next()
    return ;
  } catch {
    res.status(401).json({ error: "Token inválido" });
    return ;
  }
}
