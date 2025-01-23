import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import userService from "../services/user.services.js";

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
};

export default userController;
