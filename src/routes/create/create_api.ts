import express from "express";
import { getRepository } from "typeorm";

import { Api } from "../../entity/api";
import Request_Type from "../../enums/request_type";
import Scope from "../../enums/scope";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { tag, api_url, request_type, scope } = req.body;

    if (tag && api_url && request_type && scope) {
      const api = new Api();
      api.tag = tag;
      api.api_url = api_url;
      switch (scope) {
        case Scope.BASIC:
          api.scope = Scope.BASIC;
          break;
        case Scope.ADVANCE:
          api.scope = Scope.ADVANCE;
          break;

        default:
          throw new Error("Scope not supported");
      }
      switch (request_type) {
        case Request_Type.GET:
          api.request_type = Request_Type.GET;
          break;
        case Request_Type.POST:
          api.request_type = Request_Type.POST;
          break;

        default:
          throw new Error("Request Type not supported");
      }
      await getRepository(Api).save(api);
      return res.status(200).json(api);
    }
    return res.status(400).end();
  } catch (err) {
    console.log(err);
    
    return res.status(500).end();
  }
});

export default router;
