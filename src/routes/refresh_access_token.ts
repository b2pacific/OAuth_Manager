import express from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { User_Client } from "../entity/user_client";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const refreshToken = req.query.refresh_token;

    const user_client: any = await getRepository(User_Client)
      .createQueryBuilder("user_client")
      .leftJoinAndSelect("user_client.client", "client")
      .where("user_client.refresh_token = :refresh_token", {
        refresh_token: refreshToken,
      })
      .getOne();

    if (user_client) {
      const accessToken = jwt.sign(
        { token: user_client.id },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ access_token: accessToken });
    }
    return res.status(404).end();
  } catch (err) {
    return res.status(500).end();
  }
});

export default router;
