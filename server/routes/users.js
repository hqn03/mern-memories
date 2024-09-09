import express from "express";

import { signin, signup } from "../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.post("/signin", signin);
usersRouter.post("/signup", signup);

export default usersRouter;
