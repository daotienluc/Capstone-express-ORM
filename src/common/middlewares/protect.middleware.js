import jwt from "jsonwebtoken";
import { UnauthorizationException } from "../helpers/error.helper.js";
import { ACCESS_TOKEN_SECRET } from "../constant/app.constant.js";
import { prisma } from "../prisma/prisma.init.js";

export const protect = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      throw new UnauthorizationException(
        `Vui lòng cung cấp token để tiếp tục sử dụng`
      );
    }

    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    const user = await prisma.users.findUnique({
      where: {
        user_id: decode.userId,
      },
    });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
