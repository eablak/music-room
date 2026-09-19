import  jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token){
        return res.status(401).json({ message: "Token missing!"});
    }

    try{

        const tokenWithoutBarer = token.split(" ")[1];
        const payload = jwt.verify(tokenWithoutBarer, process.env.JWT_SECRET!) as {userId: number};

        req.userId = payload.userId;
        next();

    }catch{
        return res.status(401).json({ message: "Invalid or expired token"});
    }


};