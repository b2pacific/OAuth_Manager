import express from "express";
import { getConnection, getRepository } from "typeorm";
import axios from "axios";

import { Api } from "../../entity/api";
import { User_Client } from "../../entity/user_client";
import Request_Type from "../../enums/request_type";
import Scope from "../../enums/scope";
import { Personal } from "../../entity/personal_AT";

const router = express.Router();

router.get("/*", async (req, res, next) => {
  try {
    const api_url = req.path;
    const api = await getConnection()
      .getRepository(Api)
      .findOne({ where: { api_url: api_url, request_type: Request_Type.GET } });

    const user_client = await getConnection()
      .getRepository(User_Client)
      .findOne({ where: { id: req.id } });

    if (api) {
      const url = process.env.BASE_URL + api_url;
      if (api.scope == Scope.BASIC) {
        const response = await axios.get(url);
        return res.status(200).json(response.data);
      } else {
        if (user_client && user_client.allowed_url.includes(api.tag)) {
          const response = await axios.get(url);
          return res.status(200).json(response.data);
        }
        const personalApp = await getConnection()
          .getRepository(Personal)
          .findOne({ where: { id: req.id } });

        if (personalApp && personalApp.allowed_url.includes(api.tag)) {
          const response = await axios.get(url);
          return res.status(200).json(response.data);
        }

        return res.status(403).end();
      }
    } else {
      return res.status(404).end();
    }
  } catch (err) {
    console.log(err);

    return res.status(500).end();
  }
});

export default router;
