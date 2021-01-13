import express from "express";
import { getRepository } from "typeorm";
import crypto from "crypto";

import { Client } from "../../entity/client";

const router = express.Router();

router.post("/", async (req, res, next) => {
    
  try {
    const { callback } = req.body;

    if (callback) {
      const client = new Client();
      client.callback_url = callback;
      client.client_secret = crypto.randomBytes(12).toString("hex");
      await getRepository(Client).save(client);
      return res.status(200).json(client);
    }
    return res.status(400).end();
  } catch (err) {
    return res.status(500).end();
  }
});

export default router;
