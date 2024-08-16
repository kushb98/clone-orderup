// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../utils/validateEnv';
import { JwtPayload } from '../types/jwtPayload';

// Authenticate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({message: 'Authentication failed'});
    req.user = user as JwtPayload;
    next();
  });
};

// Authorise role of a user to process the request
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
