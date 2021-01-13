import express from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { User_Client } from "../entity/user_client";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const clientId = req.query.client_id;
    const clientSecret = req.query.client_secret;
    const authorization = req.query.authorization_grant;

    const user_client: any = await getRepository(User_Client)
      .createQueryBuilder("user_client")
      .leftJoinAndSelect("user_client.client", "client")
      .where("user_client.authorization_grant = :authorization_grant", {
        authorization_grant: authorization,
      })
      .getOne();

    if (user_client) {
      if (
        user_client.client &&
        user_client.client.client_id == clientId &&
        user_client.client.client_secret == clientSecret
      ) {
        const accesToken = jwt.sign(
          { token: user_client.id },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          access_token: accesToken,
          refresh_token: user_client.refresh_token,
        });
      }
      return res.status(403).end();
    }
    return res.status(401).end();
  } catch (err) {
    return res.status(500).end();
  }
});

export default router;
