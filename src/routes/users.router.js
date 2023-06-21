import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.post("/registration", userController.registration);
userRouter.get("/refresh", userController.refresh);

export default userRouter;
