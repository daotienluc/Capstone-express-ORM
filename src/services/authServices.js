import {
  ACCESS_TOKEN_EXPIRED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";
import { BadRequestException } from "../common/helpers/error.helper.js";
import { prisma } from "../common/prisma/prisma.init.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authService = {
  register: async (req) => {
    const { full_name, email, pass_word } = req.body;
    const userExists = await prisma.users.findFirst({
      where: { email: email },
    });

    if (userExists) {
      throw new BadRequestException("Tài khoản đã tồn tại !");
    }

    const passHash = bcrypt.hashSync(pass_word, 10);

    const userNew = await prisma.users.create({
      data: {
        full_name: full_name,
        email: email,
        pass_word: passHash,
      },
    });

    delete userNew.pass_word;

    return userNew;
  },

  login: async (req) => {
    const { email, pass_word } = req.body;

    const userExists = await prisma.users.findFirst({
      where: { email: email },
    });

    if (!userExists) {
      throw new BadRequestException("Tài khoản không tồn tại !");
    }

    if (!userExists.pass_word) {
      if (userExists.face_app_id) {
        throw new BadRequestException(
          `Vui lòng đăng nhập bằng facebook, để tạo mật khẩu mới !`
        );
      }
      if (userExists.google_id) {
        throw new BadRequestException(
          `Vui lòng đăng nhập bằng google, để tạo mật khẩu mới !`
        );
      }
      throw new BadRequestException(
        `Không hợp lệ, vui lòng liện hệ chăm sóc khách hàng !`
      );
    }

    const isPassword = bcrypt.compareSync(pass_word, userExists.pass_word);
    if (!isPassword) {
      throw new BadRequestException(`Mật khẩu không chính xác !`);
    }

    const tokens = authService.createTokens(userExists.user_id);

    return tokens;
  },

  loginFacebook: () => {},

  loginGoogle: () => {},

  refreshToken: async (req) => {
    const refreshToken = req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      throw new UnauthorizationException(
        `Vui lòng cung cấp token để tiếp tục sử dụng`
      );
    }

    const accessToken = req.headers[`x-access-token`];
    if (!accessToken) {
      throw new UnauthorizationException(
        `Vui lòng cung cấp token để tiếp tục sử dụng`
      );
    }

    const decodeRefeshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });

    if (decodeRefeshToken.userId !== decodeAccessToken.userId) {
      throw new UnauthorizationException(`Cặp Token không hợp lệ`);
    }

    const userExists = await prisma.users.findUnique({
      where: {
        user_id: decodeRefeshToken.userId,
      },
    });

    if (!userExists) throw new UnauthorizationException(`User không tồn tại`);

    const tokens = authService.createTokens(userExists.user_id);

    return tokens;
  },

  // function
  createTokens: (userId) => {
    if (!userId) throw new BadRequestException(`Không có userId để tạo token`);

    const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRED,
    });

    const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRED,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },
};

export default authService;
