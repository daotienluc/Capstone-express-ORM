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
};

export default imageService;
