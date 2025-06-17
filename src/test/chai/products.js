import dotenv from "dotenv";
import { expect } from "chai";
import connectDB from "../../config/db.js";
import { productServices } from "../../services/products.service.js";

dotenv.config();

describe("TESTING: Servicio de Productos", () => {
  let productId;
  before(async () => await connectDB(process.env.DB_PASSWORD));
  it("Se debe crear un producto correctamente", async () => {
    const response = await productServices.create({
      title: "producto de prueba",
    });
    productId = response._id;
    expect(response).to.have.property("_id");
    expect(response._id).to.be.a("object");
    expect(response).to.have.property("stock");
    expect(response.stock).to.be.a("number");
    expect(response).to.have.property("price");
    expect(response.stock).to.be.a("number");
  });
  it("No se debe crear un producto cuando no me pasan datos correctos", async () => {
    try {
      await productServices.create({});
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });
  it("Se deben leer todos los productos de la base de datos", async () => {
    const response = await productServices.getAll();
    expect(Array.isArray(response)).to.be.true;
  });
  it("No se deben leer productos de la base de datos cuando mando un filtro inexistente", async () => {
    const response = await productServices.getAll({ title: "aaaaaAAAA" });
    expect(response).to.have.lengthOf(0);
  });
  it("Se debe modificar un producto de la base de datos", async () => {
    const response = await productServices.getById(productId, {
      stock: 1000,
    });
    expect(response.stock).to.be.equals(1000);
  });
  it("Se debe eliminar un producto de la base de datos", async () => {
    await productServices.deleteOne(productId);
    const one = await productServices.getById(productId);
    expect(one).to.be.a("null");
  });
});