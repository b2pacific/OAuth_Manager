import express, { Router } from "express";
import { getConnection } from "typeorm";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { Client } from "../entity/client";
import { User } from "../entity/user";
import { User_Client } from "../entity/user_client";
import Scope from "../enums/scope";

const router: Router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const clientId = req.query.client_id;
    const client = await getConnection()
      .getRepository(Client)
      .findOne({ where: { client_id: clientId } });

    if (client) {
      return res.status(200).json(client);
    } else {
      return res.status(401).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const clientId = req.query.client_id;
    const scope = req.query.scope;

    const username = req.body.username;
    const password = req.body.password;

    const user = await getConnection()
      .getRepository(User)
      .findOne({ where: { username: username } });

    const client = await getConnection()
      .getRepository(Client)
      .findOne({ where: { client_id: clientId } });

    if (user && client) {
      bcrypt.compare(password, user.password).then((result) => {
        console.log(result);

        if (result) {
          const user_client = new User_Client();
          user_client.user = user;
          user_client.client = client;
          user_client.authorization_grant = crypto
            .randomBytes(6)
            .toString("hex");
          user_client.refresh_token = crypto.randomBytes(12).toString("hex");
          switch (scope) {
            case Scope.BASIC:
              user_client.scope = Scope.BASIC;
              break;
            case Scope.ADVANCE:
              user_client.scope = Scope.ADVANCE;
              break;
            default:
              throw new Error("Scope not supported");
          }
          getConnection().manager.save(user_client);
          const redirect_url =
            client.callback_url +
            "?authorization_grant=" +
            user_client.authorization_grant;
          // return res.redirect(200, redirect_url);
          return res.status(200).json({ url: redirect_url });
        } else {
          return res.redirect(403, client.callback_url);
        }
      });
    } else {
      return res.status(400).end();
    }
  } catch (err) {
    return res.status(500).end();
  }
});

export default router;
