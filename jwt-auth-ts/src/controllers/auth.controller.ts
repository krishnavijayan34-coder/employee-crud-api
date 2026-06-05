import { Request,Response } from "express";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";
import {User,Role} from "../models/association";
import { authConfig } from "../config/auth.config";

export const signup = async(req:Request,res:Response) => {
    const user = await User.create({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    });

    if(req.body.roles) {

       const roles = await Role.findAll({
      where: { name: req.body.roles }
    });

    await (user as any).setRoles(roles);
  } else {
    await (user as any).setRoles([1]);
  }

  res.send({ message: "User registered successfully" });
};

export const signin = async (req: Request, res: Response) => {
  const user: any = await User.findOne({
    where: { username: req.body.username }
  });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const valid = bcrypt.compareSync(req.body.password, user.password);

  if (!valid) {
    return res.status(401).send({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id },
    authConfig.secret,
    { expiresIn: 86400 }
  );
   const roles = await user.getRoles();

  const roleNames = roles.map((r: any) => r.name);

  return res.send({
    id: user.id,
    username: user.username,
    roles: roleNames,   
    accessToken: token
  
  });
};