// middleware/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded; // giả sử JWT chứa { id, role }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
