import type { NextFunction, Request, Response } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
   
    const isAuthenticated = true; 

    if (isAuthenticated) {
        next(); 
    } else {
        res.status(401).send('Unauthorized'); 
    }
}