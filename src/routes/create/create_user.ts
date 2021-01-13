import express from "express";
import { getRepository } from "typeorm";
import bcrytp from "bcrypt";

import { User } from "../../entity/user";

const saltRound = process.env.SALT_ROUNDS as any || 10;
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (username && password) {
      const user = new User();
      user.username = username;
      const hash = await bcrytp.hash(password, saltRound);
      user.password = hash;
      await getRepository(User).save(user);
      return res.status(200).json(user);
    }
    return res.status(400).end();
  } catch (err) {    
    return res.status(500).end();
  }
});

export default router;
