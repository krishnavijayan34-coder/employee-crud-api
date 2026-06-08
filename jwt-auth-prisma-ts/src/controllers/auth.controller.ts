import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, roleId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!role) {
      return res.status(400).json({
        message: "Role not found"
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roleId
      }
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: user.id
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
      message: "Signup failed"
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role.name
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({
      id: user.id,
      username: user.username,
      role: user.role.name,
      accessToken: token
    });
  } catch (error) {
    console.error("SIGNIN ERROR:", error);
    return res.status(500).json({
      message: "Signin failed"
    });
  }
};