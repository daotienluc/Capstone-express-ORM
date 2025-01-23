import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import authService from "../services/auth.services.js";

const authController = {
  register: async (req, res, next) => {
    try {
      const data = await authService.register(req);
      const resData = responseSuccess(data, `Register Successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const data = await authService.login(req);
      const resData = responseSuccess(data, `Login Successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  loginFacebook: () => {},
  loginGoogle: () => {},
};

export default authController;
