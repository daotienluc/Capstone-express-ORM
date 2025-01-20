import express from "express";
import authRouter from "./auth.routers.js";
import imageRouter from "./image.routers.js";
import userRouter from "./user.routers.js";
const rootRouter = express.Router();
rootRouter.use("/auth", authRouter);
rootRouter.use("/image", imageRouter);
rootRouter.use("/user", userRouter);
export default rootRouter;
