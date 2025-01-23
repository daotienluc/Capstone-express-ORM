import { prisma } from "../common/prisma/prisma.init.js";

const userService = {
  getAllUser: async () => {
    const data = await prisma.users.findMany();
    data.map((item) => (item.pass_word = ""));
    return data;
  },
};

export default userService;
