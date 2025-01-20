import express from "express";
import imageController from "../controllers/image.controllers.js";
const imageRouter = express.Router();
// lấy tất cả hình ảnh
imageRouter.get("/getAllImage", imageController.getAllImage);

// tìm kiếm hình ảnh theo tên hình ảnh
imageRouter.get("/getImageByName/:imageName", imageController.getImageByName);

// Thêm hình ảnh
imageRouter.post("/addImage", imageController.addImage);

// lấy thông tin ảnh và id người dùng theo id ảnh
imageRouter.get(
  "/getImageAndUserById/:id",
  imageController.getImageAndUserById
);

// lấy thông tin bình luận theo id ảnh
imageRouter.get("/getCommentById/:id", imageController.getCommentById);

// lấy danh sách ảnh đã lưu theo userId
imageRouter.get("/getListImageBy");

export default imageRouter;
