import { Request, Response, NextFunction } from "express";
import { User, Role } from "../models/association";


export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check username
    const usernameExists = await User.findOne({
      where: { username: req.body.username }
    });

    if (usernameExists) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email }
    });

    if (emailExists) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Server error while checking duplicates"
    });
  }
};


export const checkRolesExisted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.roles) {
      const rolesFromDB = await Role.findAll();

      const validRoles = rolesFromDB.map((r: any) => r.name);

      for (let i = 0; i < req.body.roles.length; i++) {
        if (!validRoles.includes(req.body.roles[i])) {
          return res.status(400).send({
            message: `Role does not exist: ${req.body.roles[i]}`
          });
        }
      }
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Server error while checking roles"
    });
  }
};