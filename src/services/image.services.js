import { BadRequestException } from "../common/helpers/error.helper.js";
import { prisma } from "../common/prisma/prisma.init.js";

const imageService = {
  getAllImage: async () => {
    const data = await prisma.images.findMany();
    return data;
  },
  getImageByName: async (req) => {
    const { imageName } = req.params;
    const data = await prisma.images.findMany({
      where: {
        image_name: {
          contains: imageName,
        },
      },
    });
    return data;
  },
  addImage: async (req) => {
    const { image_name, image, description, author } = req.body;
    const data = await prisma.images.create({
      data: {
        image_name: image_name,
        image: image,
        description: description,
        author: author,
      },
    });
    return data;
  },
  getImageAndUserById: async (req) => {
    let id = req.params.id;
    id = +id;
    const data = prisma.images.findFirst({ where: { image_id: id } });
    return data;
  },
  getCommentById: async (req) => {
    let id = req.params.id;
    id = +id;
    const data = prisma.comments.findFirst({ where: { image_id: id } });
    return data;
  },
  getListImageById: async (req) => {
    const { user_id, image_id } = req.body;
    const data = await prisma.save_image.findUnique({
      where: { user_id_image_id: { user_id: user_id, image_id: image_id } },
    });
    if (data) {
      return { message: "Ảnh đã được lưu !" };
    } else {
      const checkData = await prisma.save_image.findFirst({
        where: { image_id: image_id },
      });
      if (!checkData) {
        throw new BadRequestException("Không thể tìm thấy ảnh !");
      }
      const newData = await prisma.save_image.create({
        data: { user_id: user_id, image_id: image_id },
      });
      return { newData, message: "Lưu ảnh thành công !" };
    }
  },
  saveCommentById: async (req) => {
    const { user_id, image_id, content } = req.body;
    const data = await prisma.comments.create({
      data: { user_id: user_id, image_id: image_id, content: content },
    });
    return data;
  },
};

export default imageService;
