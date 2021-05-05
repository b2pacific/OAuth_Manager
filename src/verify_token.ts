import { NextFunction, Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { User_Client } from "./entity/user_client";
import { Personal } from "./entity/personal_AT";

const verify_token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!.split("Bearer ")[1];
    if (token) {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET
          ? process.env.JWT_SECRET
          : () => {
              throw new Error("JWT Secret missing");
            }
      );
      const user_client = await getConnection()
        .getRepository(User_Client)
        .createQueryBuilder("user_client")
        .leftJoinAndSelect("user_client.client", "client")
        .where("user_client.id = :id", {
          id: decoded.token,
        })
        .getOne();
      if (user_client) {
        req.id = user_client.id;
        next();
      } else {
        return res.status(404).end();
      }
    } else {
      if (req.query.access_token) {
        const personalApp = await getRepository(Personal)
          .createQueryBuilder("personal_AT")
          .where("personal_AT.access_token = :accesstoken", {
            access_token: req.query.access_token,
          })
          .getOne();

        if (personalApp) {
          req.id = personalApp.id;
          next();
        }
        return res.status(404).end();
      } else {
        next();
      }
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") return res.status(401).end();

    return res.status(500).end();
  }
};

export default verify_token;
