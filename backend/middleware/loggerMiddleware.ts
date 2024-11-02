import { NextFunction, Request, Response } from 'express';

export default function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
    );
    next();
}
