import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import userService from "../services/userServices.js";

const userController = {
  getAllUser: async (req, res, next) => {
    try {
      const data = await userService.getAllUser();
      const resData = responseSuccess(data, `Get All User Successfully !`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getUserInfoByImageId: async (req, res, next) => {
    const { image_id } = req.query
    try {
      const data = await userService.getUserInfoByImageId(image_id);
      const resData = responseSuccess(data, `Get user info successfully`, 200);
      res.status(resData.code).json(resData)
    } catch (error) {
      next(error)
    }
  }
};

export default userController;
