import { cartDao } from "../persistence/dao/cart.dao.js";

export const getAllCarts = async (req, res) => {
  try {
    const carts = await cartDao.getAll();
    res.json(carts);
  } catch (error) {
    console.log("Error in get all carts controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartDao.getById(cid);
    res.json(cart);
  } catch (error) {
    console.log("Error in get cart by id controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCart = async (req, res) => {
  try {
    const cart = await cartDao.create();
    res.json(cart);
  } catch (error) {
    console.log("Error in create cart controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartDao.addProductToCart(cid, pid);
    res.json(cart);
  } catch (error) {
    console.log("Error in add product to cart controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProductToCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartDao.deleteProductToCart(cid, pid);
    res.json(cart);
  } catch (error) {
    console.log("Error in delete product to cart controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuantityProductInCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;
    const cart = await cartDao.updateQuantityProductInCart(cid, pid, quantity);
    res.json(cart);
  } catch (error) {
    console.log(
      "Error in update quantity product in cart controller",
      error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

export const clearProductsToCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartDao.clearProductsToCart(cid);
    res.json(cart);
  } catch (error) {
    console.log("Error in clear products to cart controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
