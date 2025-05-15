import { cartServices } from "../services/cart.service.js";
import { ticketService } from "../services/ticket.service.js";
import { productServices } from "../services/products.service.js";

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await cartServices.getAll();
    res.json(carts);
  } catch (error) {
    next(error);
  }
};

export const getCartById = async (req, res, next) => {
  try {
    const cid = req.params.cid;
    const cart = await cartServices.getCartById(cid);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const cart = await cartServices.createCart();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const product = await productServices.getById(pid);
    if (!product)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el producto con el id ${pid}`,
      });
    const cart = await cartServices.getCartById(cid);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      });

    const cartUpdate = await cartServices.addProductToCart(cid, pid);

    res.status(200).json({ status: "ok", payload: cartUpdate });
  } catch (error) {
    next(error);
  }
};

export const deleteProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const product = await productServices.getById(pid);
    if (!product)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el producto con el id ${pid}`,
      });
    const cart = await cartServices.getCartById(cid);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      });

    const cartUpdate = await cartServices.deleteProductToCart(cid, pid);

    res.status(200).json({ status: "ok", payload: cartUpdate });
  } catch (error) {
    next(error);
  }
};

export const updateQuantityProductInCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const product = await productServices.getById(pid);
    if (!product)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el producto con el id ${pid}`,
      });
    const cart = await cartServices.getCartById(cid);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      });

    const cartUpdate = await cartServices.updateQuantityProductInCart(
      cid,
      pid,
      Number(quantity)
    );

    res.status(200).json({ status: "ok", payload: cartUpdate });
  } catch (error) {
    next(error);
  }
};

export const clearProductsToCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.clearProductsToCart(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "ok", cart });
  } catch (error) {
    next(error);
  }
};

export const purchaseCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.getCartById(cid);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cid}`,
      });

    const total = await cartServices.purchaseCart(cid);
    const ticket = await ticketService.createTicket(total, req.user.email);

    res.status(200).json({ status: "ok", ticket });
  } catch (error) {
    next(error);
  }
};
