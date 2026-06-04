import {Request,Response,NextFunction}from "express";

import User from "../models/user";
export const checkDuplicateEmail =
async(req:Request,res:Response,next:NextFunction)=>{

const user =await User.findOne({where:{email:req.body.email}
});

if(user){

return res.status(400).json({message:"Email already exists"});

}

next();
};