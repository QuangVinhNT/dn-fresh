import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface User {
      id: string;
      roleId: 'VT001' | 'VT002' | 'VT003' | 'VT004' | undefined;
    }
    interface Request {
      user?: User;
    }
  }
}

export const fakeAuth = (role?: 'VT001' | 'VT002' | 'VT003' | 'VT004') => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.user = {
      id: '1',
      roleId: role || undefined,
    };
    next();
  };
};
