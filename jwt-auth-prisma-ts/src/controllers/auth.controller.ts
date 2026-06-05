import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * SIGNUP
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, roles } = req.body;

    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    // 3. Assign roles (if provided)
    if (roles && roles.length > 0) {
      const dbRoles = await prisma.role.findMany({
        where: {
          name: {
            in: roles
          }
        }
      });

      if (dbRoles.length === 0) {
        return res.status(400).json({
          message: "No matching roles found in database"
        });
      }

      await prisma.userRole.createMany({
        data: dbRoles.map((role) => ({
          userId: user.id,
          roleId: role.id
        }))
      });
    } else {
      // 4. Default role (IMPORTANT)
      const defaultRole = await prisma.role.findFirst({
        where: { name: "user" }
      });

      if (defaultRole) {
        await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: defaultRole.id
          }
        });
      }
    }

    return res.status(201).json({
      message: "User registered successfully",
      userId: user.id
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({ message: "Signup failed" });
  }
};

/**
 * SIGNIN
 */
export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 1. Find user
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Get user roles
    const userRoles = await prisma.userRole.findMany({
      where: { userId: user.id },
      include: { role: true }
    });

    const roles = userRoles.map((ur) => ur.role.name);

    // 4. Generate token
    const token = jwt.sign(
      { userId: user.id, roles },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({
      id: user.id,
      username: user.username,
      roles,
      accessToken: token
    });
  } catch (error) {
    console.error("SIGNIN ERROR:", error);
    return res.status(500).json({ message: "Signin failed" });
  }
};