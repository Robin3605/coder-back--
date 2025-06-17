import dotenv from "dotenv";
import { expect } from "chai";
import supertest from "supertest";

dotenv.config();

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing de Productos", function() {
    this.timeout(10000);
    
    let adminToken;
    let productId;
    let testProduct;
  
    before(async () => {
      testProduct = {
        title: `Test Product ${Date.now()}`,
        description: "Test Description",
        price: 99.99,
        code: `TEST-${Math.floor(Math.random() * 10000)}`,
        stock: 10,
        category: "test"
      };
  
      
      const adminLogin = await requester.post("/auth/login").send({
        email: "rene@gmail.com",
        password: "123456"
      });
      
      if (adminLogin.body && adminLogin.body.token) {
        adminToken = adminLogin.body.token;
      } else {
        console.error("Respuesta de login admin:", adminLogin.body);
        throw new Error("Fallo en autenticación de administrador");
      }
    });
  
    after(async () => {
      if (productId) {
        await requester
          .delete(`/products/${productId}`)
          .set("Authorization", `Bearer ${adminToken}`);
      }
    });
  
    it("POST /products - Debe crear un nuevo producto (admin)", async () => {
      const response = await requester
        .post("/products")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(testProduct);
      
     
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body).to.have.property("_id");
      productId = response.body._id;
      
      console.log("Producto creado:", response.body);
    });
  
    it("GET /products - Debe obtener todos los productos", async () => {
      const response = await requester.get("/products");
      
  
      if (response.body.docs) {
        expect(response.body.docs).to.be.an("array");
      } else {
        expect(response.body).to.be.an("array");
      }
    });
  
    it("GET /products/:pid - Debe obtener un producto por ID", async () => {
      if (!productId) this.skip();
      
      const response = await requester.get(`/products/${productId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("_id", productId);
    });
  
    it("PUT /products/:pid - Debe actualizar un producto (admin)", async () => {
      if (!productId) this.skip();
      
      const updatedData = { price: 129.99 };
      const response = await requester
        .put(`/products/${productId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedData);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("price", 129.99);
    });
  
    it("DELETE /products/:pid - Debe eliminar un producto (admin)", async () => {
      if (!productId) this.skip();
      
      const response = await requester
        .delete(`/products/${productId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      
      expect(response.status).to.equal(200);
      productId = null;
    });
  });

