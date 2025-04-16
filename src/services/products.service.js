import { productDao } from "../persistence/dao/products.dao.js";

class ProductServices {
  async getAll(query, options) {
    const products = await productDao.getAll(query, options);
    return products;
  }

  async getById(id) {
    const product = await productDao.getById(id);
    return product;
  }

  async create(data) {
    const product = await productDao.create(data);
    return product;
  }

  async update(id, data) {
    const productUpdate = await productDao.update(id, data);
    return productUpdate;
  }

  async deleteOne(id) {
    const product = await productDao.deleteOne(id);
    return product;
  }
}

export const productServices = new ProductServices();
