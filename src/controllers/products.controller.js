import { productDao } from "../persistence/dao/products.dao.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productDao.getAll();
    res.json(products);
  } catch (error) {
    console.log("Error in get all products controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productDao.getById(pid);
    res.json(product);
  } catch (error) {
    console.log("Error in get product by id controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productDao.create(req.body);
    res.json(product);
  } catch (error) {
    console.log("Error in create product controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productDao.update(pid, req.body);
    res.json(product);
  } catch (error) {
    console.log("Error in update product controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productDao.deleteOne(pid);
    res.json(product);
  } catch (error) {
    console.log("Error in delete product controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
