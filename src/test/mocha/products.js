import "dotenv/config.js";
import assert from "assert";
import connectDB from "../../config/db.js";
import { productServices } from "../../services/products.service.js";

describe("TESTING: Servicio de Productos", () => {
  let productId;
  before(async () => await connectDB(process.env.DB_PASSWORD));
  it("Se debe crear un producto correctamente", async () => {
    const response = await productServices.create({
      title: "producto de prueba",
    });
    productId = response._id;
    assert.ok(response._id);
  });

  it("Se deben leer todos los productos de la base datos", async () => {
    const response = await productServices.getAll();
    assert.ok(response.length > 0);
  });
  it("No se deben leer productos de la base datos cuando mando un filtro inexistente", async () => {
    const response = await productServices.getAll({ title: "aaaaaAAAA" });
    //assert.ok(response.length === 0);
    assert.strictEqual(response.length, 0);
  });
  it("Se debe leer un producto de la base de datos", async () => {
    const response = await productServices.getById(productId);
    assert.ok(response._id);
  });
  it("Se debe modificar un producto de la base de datos", async () => {
    const response = await productServices.update(productId, {
      stock: 1000,
    });
    //assert.ok(response.stock === 1000);
    assert.strictEqual(response.stock, 1000);
  });
  it("Se debe eliminar un producto de la base de datos", async () => {
    await productServices.deleteOne(productId);
    const one = await productServices.getById(productId);
    //assert.ok(one === null);
    assert.strictEqual(one, null)
  });
});