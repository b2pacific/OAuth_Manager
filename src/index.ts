import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();

import verify_token from "./verify_token";
import request_auth from "./routes/request_auth";
import get_tokens from "./routes/get_tokens";
import refresh_token from "./routes/refresh_access_token";

import user from "./routes/create/create_user";
import client from "./routes/create/create_client";
import api from "./routes/create/create_api";

import get_data from "./routes/api/get_data";
import post_data from "./routes/api/post_data";

import { _ } from "core-js";
import rateLimiterMiddleware from "./rate-limit";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

createConnection({
  type: "postgres",
  url: process.env.DB_URI || "postgres://prashant:@localhost:5432/test",
  entities: ["./src/entity/*.ts"],
  synchronize: true,
  logging: true,
})
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.use("/create-user", user);
app.use("/create-client", client);
app.use("/create-api", api);

app.use("/auth/request-auth", request_auth);

app.use("/auth/get-tokens", get_tokens);

app.use("/auth/refresh", refresh_token);

app.use("/api/get-data", verify_token, rateLimiterMiddleware, get_data);

app.use("/api/post-data", verify_token, rateLimiterMiddleware, post_data);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on 3000 ${process.env.PORT || 3000}`);
});
