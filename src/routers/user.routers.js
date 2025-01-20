import express from "express";
import userController from "../controllers/userControllers.js";
const userRouter = express.Router();
userRouter.get("/getAllUser", userController.getAllUser);
export default userRouter;
