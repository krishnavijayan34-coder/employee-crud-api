import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { authConfig } from "../config/auth.config";

export interface AuthRequest extends Request {
    userId?:number;
}

export const verifyToken = (
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=> {
    const token = req.headers["x-access-token"] as string;
    if(!token) {
        return res.status(403).send({message:"No token provided"});
    }
    jwt.verify(token,authConfig.secret,(err,decoded:any)=>{
        if(err) {
            return res.status(401).send({message:"Unauthorized"});
        }
        req.userId=decoded.id;
        next();
    });
};