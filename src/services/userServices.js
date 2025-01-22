import { BadRequestException } from "../common/helpers/error.helper.js";
import { prisma } from "../common/prisma/prisma.init.js";

const userService = {
  getAllUser: async () => {
    const data = await prisma.users.findMany();
    data.map((item) => (item.pass_word = ""));
    return data;
  },
  getUserInfoByImageId: async (imageId) => {
    const imageObj = await prisma.save_image.findFirst({
      where: {
        image_id: +imageId
      }
    })
    if(!imageObj) throw new BadRequestException(`Không tìm thấy image_id này trong hệ thống.`)
    const userId = imageObj.user_id
    const user = await prisma.users.findFirst({
      where: {
        user_id: userId
      }
    })
    return user
  },

};

export default userService;
