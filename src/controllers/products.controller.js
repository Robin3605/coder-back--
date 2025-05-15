import { productServices } from "../services/products.service.js";
import { validateData } from "../utils/validationData.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productServices.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const product = await productServices.getById(pid);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const {title, description, code, price,  stock, category} = req.body;
    validateData(title, description, code, price, stock, category);
    const product = await productServices.create(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const product = await productServices.update(pid, req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const product = await productServices.deleteOne(pid);
    res.json(product);
  } catch (error) {
    next(error);
  }
};
