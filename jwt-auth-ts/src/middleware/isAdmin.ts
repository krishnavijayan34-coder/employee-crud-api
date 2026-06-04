import { Response,NextFunction } from "express";
import {User} from "../models/association";
import { AuthRequest } from "./verifyToken";

export const isAdmin = async (
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=> {
    const user:any =await User.findByPk(req.userId as number);
    const roles =await user.getRoles();

    for(let r of roles) {
        if(r.name === "admin") {
            return next();
        }
    }
    return res.status(403).send({message:"Require Admin Role"});
};