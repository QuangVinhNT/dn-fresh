import { Request, Response, NextFunction, RequestHandler } from 'express';

export const checkRole = (allowedRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || typeof req.user.roleId !== 'string' || !allowedRoles.includes(req.user.roleId)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};
