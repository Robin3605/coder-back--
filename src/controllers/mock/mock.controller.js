import { userService } from "../../services/users.service.js";
import { productServices } from "../../services/products.service.js";
import createMockProducts from "../../helpers/mock/products.mock.js";
import createMockUsers from "../../helpers/mock/user.mock.js";
import { hashPassword } from "../../utils/hashPassword.js";

export const createNewMockProducts = async (req, res, next) => {
  try {
    const { n } = req.params;
    const createdProducts = [];
    for (let index = 0; index < n; index++) {
      const products = createMockProducts();
      createdProducts.push(products);
      await productServices.create(products);
    }
    res.send({
      message: `${n} productos creados`,
      products: createdProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const createNewMockUsers = async (req, res, next) => {
  try {
    const { n } = req.params;
    const createdUsers = [];
    for (let index = 0; index < n; index++) {
      const users = createMockUsers();
      const hashNewPassword = hashPassword(users.password);
      createdUsers.push({...users, password: hashNewPassword});
       await userService.create(users);
    }
    res.send({ message: `${n} usuarios creados`, users: createdUsers });
  } catch (error) {
    next(error);
  }
};
