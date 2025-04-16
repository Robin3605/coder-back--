import { productServices } from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productServices.getAll();
    res.json(products);
  } catch (error) {
    console.log("Error in get all products controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productServices.getById(pid);
    res.json(product);
  } catch (error) {
    console.log("Error in get product by id controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await productServices.create(req.body);
    res.json(product);
  } catch (error) {
    console.log("Error in create product controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productServices.update(pid, req.body);
    res.json(product);
  } catch (error) {
    console.log("Error in update product controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productServices.deleteOne(pid);
    res.json(product);
  } catch (error) {
    console.log("Error in delete product controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
