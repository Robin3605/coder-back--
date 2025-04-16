import { cartDao } from "../persistence/dao/cart.dao.js";
import { productDao } from "../persistence/dao/products.dao.js";

class CartServices {
  async createCart() {
    return await cartDao.create();
  }

  async getAll() {
    return await cartDao.getAll();
  }

  async getCartById(cid) {
    return await cartDao.getById(cid);
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    const productInCart = cart.products.find(
      (element) => element.product._id.toString() == pid
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async deleteProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    cart.products = cart.products.filter(
      (element) => element.product._id.toString() != pid
    );
    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async updateQuantityProductInCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    const product = cart.products.find((element) => element.product == pid);
    product.quantity = quantity;
    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async clearProductsToCart(cid) {
    const cartUpdate = await cartDao.update(cid, { products: [] });
    return cartUpdate;
  }

  async purchaseCart(cid) {
    const cart = await cartDao.getById(cid);

    let total = 0;
    const products = [];

    for (const productCart of cart.products) {
      const prod = await productDao.getById(productCart.product);

      if (prod.stock >= productCart.quantity) {
        total += prod.price * productCart.quantity;

        await productDao.update(prod._id, {
          stock: prod.stock - productCart.quantity,
        });
      } else {
        products.push(productCart);
      }

      await cartDao.update(cid, { products });
    }

    return total;
  }
}

export const cartServices = new CartServices();
