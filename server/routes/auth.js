import express from "express";
import * as usersController from "../controllers/usersController.js";
const router = express.Router();
import axios from "axios";
import { OAuth2Client } from "google-auth-library";

router.post("/google", async (req, res) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, "postmessage");
  try {
    const code = req.body.codeResponse;
    const { tokens } = await oAuth2Client.getToken(code);
    // console.log(tokens);
    return res.status(200).json(tokens.id_token);
  } catch (error) {
    return res.status(404).json(null);
  }
});

export default router;
