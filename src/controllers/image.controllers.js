import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import imageService from "../services/image.services.js";

const imageController = {
  getAllImage: async (req, res, next) => {
    try {
      const data = await imageService.getAllImage();
      const resData = responseSuccess(
        data,
        `Get All Image Successfully !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getImageByName: async (req, res, next) => {
    try {
      const data = await imageService.getImageByName(req);
      const resData = responseSuccess(
        data,
        `Found ${data.length} results !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  addImage: async (req, res, next) => {
    try {
      const data = await imageService.addImage(req);
      const resData = responseSuccess(
        data,
        `Found ${data.length} results !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getImageAndUserById: async (req, res, next) => {
    try {
      const data = await imageService.getImageAndUserById(req);
      const resData = responseSuccess(
        data,
        `Get Image and user id by id Successfully !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getCommentById: async (req, res, next) => {
    try {
      const data = await imageService.getCommentById(req);
      const resData = responseSuccess(
        data,
        `Get comment by id Successfully !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getListImageById: async (req, res, next) => {
    try {
      const data = await imageService.getListImageById(req);
      const resData = responseSuccess(data, data.message, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  saveCommentById: async (req, res, next) => {
    try {
      const data = await imageService.saveCommentById(req);
      const resData = responseSuccess(
        data,
        "Save Comment by id Successfully",
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getListImagesSavedByUserId: async (req, res, next) => {
    const { user_id } = req.query
    try {
      const data = await imageService.getListImagesSavedByUserId(user_id)
      const resData = responseSuccess(data, `Get list images saved by user id successfully.`, 200)
      res.status(resData.code).json(resData)
    } catch (error) {
      next(error)
    }
  },
  getListImagesCreatedByUserId: async (req, res, next) => {
    const { user_id } = req.query
    try {
      const data = await imageService.getListImagesCreatedByUserId(user_id)
      const resData = responseSuccess(data, `Get list images created by user id successfully.`, 200)
      res.status(resData.code).json(resData)
    } catch (error) {
      next(error)
    }
  },
  deleteImageByImageId: async (req, res, next) => {
    const { image_id } = req.query
    try {
      const data = await imageService.deleteImageByImageId(image_id)
      const resData = responseSuccess(data, `Deleled image with id = ${image_id} successfully`, 200)
      res.status(resData.code).json(resData) 
    } catch (error) {
      next(error)
    }
  }
};

export default imageController;
