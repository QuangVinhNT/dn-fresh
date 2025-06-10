import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface User {
      id: number;
      role: 'admin' | 'staff' | 'user' | undefined;
    }
    interface Request {
      user?: User;
    }
  }
}

export const fakeAuth = (role?: 'admin' | 'staff' | 'user') => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.user = {
      id: 1,
      role: role || undefined,
    };
    next();
  };
};
