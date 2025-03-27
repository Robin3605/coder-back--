import { productsModel } from "../models/products.model.js";

class ProductDao {
  async getAll(query, options) {
    const products = await productsModel.paginate(query, options);
    return products;
  }

  async getById(id) {
    const product = await productsModel.findById(id);
    return product;
  }

  async create(data) {
    const product = await productsModel.create(data);
    return product;
  }

  async update(id, data) {
    const productUpdate = await productsModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return productUpdate;
  }

  async deleteOne(id) {
    const product = await productsModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return product;
  }
}

export const productDao = new ProductDao();
