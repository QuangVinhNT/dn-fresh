import { Request, Response, NextFunction, RequestHandler } from 'express';

export const checkRole = (allowedRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || typeof req.user.role !== 'string' || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};
