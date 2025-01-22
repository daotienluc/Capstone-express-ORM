import express from "express";
import userController from "../controllers/userControllers.js";
const userRouter = express.Router();
userRouter.get("/getAllUser", userController.getAllUser);
userRouter.get("/getUserInfo", userController.getUserInfoByImageId);
export default userRouter;
