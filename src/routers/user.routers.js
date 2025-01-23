import express from "express";
import userController from "../controllers/user.controllers.js";
const userRouter = express.Router();
userRouter.get("/getAllUser", userController.getAllUser);
export default userRouter;
