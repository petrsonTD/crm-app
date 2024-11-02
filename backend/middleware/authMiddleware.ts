import { Request, Response, NextFunction } from 'express';
import { AuthTokenI } from '../intefaces/interfaces.ts';
import { includesObject } from '../utils/functions.ts';

export const activeUsers: AuthTokenI[] = [];

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authToken: AuthTokenI = req.cookies.authToken;

    if (!req.cookies.authToken?.userId || !includesObject(activeUsers, authToken)) {
        res.status(401).json({ isAuthenticated: false });
        return;
    }

    next();
}
