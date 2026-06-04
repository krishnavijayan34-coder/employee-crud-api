import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";
import Role from "../models/role";
import authConfig from "../config/auth.config";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, roles } = req.body;
        console.log("REQUEST BODY:", req.body); 
        console.log("ROLES FROM REQUEST:", roles);

        const hashedPassword = bcrypt.hashSync(password, 8);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        if (roles && roles.length > 0) {
            const roleRecords = await Role.findAll({
                where: {
                    name: roles
                }
            });

            await (user as any).setRoles(roleRecords);
        }

        return res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user: any = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const validPassword = bcrypt.compareSync(
            password,
            user.getDataValue("password")
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user.id },
            authConfig.secret,
            { expiresIn: "1h" }
        );

        const roles = await user.getRoles();
        const authorities = roles.map((r: any) => "ROLE_" + r.name.toUpperCase());

        return res.status(200).json({
            id: user.id,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};