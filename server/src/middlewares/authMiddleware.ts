import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("Missing JWT_SECRET in .env");
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("No token provided");
  } else {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, secret, async (err, payload) => {
        (req as any).user = payload;
      });
    } catch (error) {
      console.error("Invalid token");
    }
  }
  next();
};
