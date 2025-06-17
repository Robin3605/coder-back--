import dotenv from "dotenv";
import { expect } from "chai";
import supertest from "supertest";

dotenv.config();

const requester = supertest(`http://localhost:${process.env.PORT}/api`);


describe("Testing de Carritos", function() {
    this.timeout(15000);
    
    let adminToken;
    let userToken;
    let cartId;
    let userId;
    let testUser;
    let testProduct;
    let tempProductId; 
  
    before(async () => {
      testUser = {
        email: `testuser${Date.now()}@example.com`,
        password: "Test1234!",
        first_name: "Test",
        last_name: "User"
      };
  
      testProduct = {
        title: `Test Product ${Date.now()}`,
        description: "Test Description",
        price: 99.99,
        code: `TEST-${Math.floor(Math.random() * 10000)}`,
        stock: 10,
        category: "test"
      };
  
     
      const adminLogin = await requester.post("/auth/login").send({
        email: process.env.ADMIN_EMAIL || "julian@gmail.com",
        password: process.env.ADMIN_PASSWORD || "1234"
      });
      
      if (adminLogin.body?.token) {
        adminToken = adminLogin.body.token;
        console.log("Admin token obtenido");
      } else {
        console.error("Error en login admin:", adminLogin.body);
        throw new Error("Fallo en autenticación de administrador");
      }
  
      
      const userRes = await requester.post("/auth/register").send(testUser);
      
      if (userRes.body?.message?._id && userRes.body?.message?.cart) {
        userId = userRes.body.message._id;
        cartId = userRes.body.message.cart;
        console.log("Usuario creado ID:", userId);
        console.log("Carrito ID obtenido del registro:", cartId);
      } else {
        console.error("Error en creación de usuario:", userRes.body);
        throw new Error("Fallo en creación de usuario");
      }
      
      
      const userLogin = await requester.post("/auth/login").send({
        email: testUser.email,
        password: testUser.password
      });
      
      if (userLogin.body?.token) {
        userToken = userLogin.body.token;
        console.log("User token obtenido");
      } else {
        console.error("Error en login usuario:", userLogin.body);
        throw new Error("Fallo en autenticación de usuario");
      }

      
      const productRes = await requester
        .post("/products")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          ...testProduct,
          owner: "admin"
        });
      
      console.log("Respuesta creación producto global:", productRes.body);
      
      if (productRes.status === 200 || productRes.status === 201) {
        tempProductId = productRes.body._id;
        console.log("Producto temporal creado ID:", tempProductId);
      } else {
        throw new Error(`Fallo creando producto global: ${productRes.body.msg || productRes.body.message}`);
      }
    });
  
    after(async () => {
      
      if (tempProductId) {
        await requester
          .delete(`/products/${tempProductId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .catch(e => console.error("Error eliminando producto:", e));
      }
      
      if (userId) {
        await requester
          .delete(`/users/${userId}`)
          .set("Authorization", `Bearer ${adminToken}`)
          .catch(e => console.error("Error eliminando usuario:", e));
      }
    });
  
    it("POST /carts/:cid/products/:pid - Debe agregar producto al carrito (user)", async () => {
      const response = await requester
        .post(`/carts/${cartId}/products/${tempProductId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 2 });
      
      expect(response.status).to.equal(200);
      expect(response.body.products).to.be.an("array");
      
      const addedProduct = response.body.products.find(
        p => p.product === tempProductId
      );
      expect(addedProduct).to.exist;
    });
  
    it("GET /carts/:cid - Debe obtener carrito por ID", async () => {
      const response = await requester
        .get(`/carts/${cartId}`)
        .set("Authorization", `Bearer ${userToken}`);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("_id", cartId);
      expect(response.body).to.have.property("products").that.is.an("array");
    });
  
    it("PUT /carts/:cid/products/:pid - Debe actualizar cantidad", async () => {
      
      await requester
        .post(`/carts/${cartId}/products/${tempProductId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 1 });

     
      const response = await requester
        .put(`/carts/${cartId}/products/${tempProductId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 3 });
      
      expect(response.status).to.equal(200);
      
      const updatedProduct = response.body.products.find(
        p => p.product === tempProductId
      );
      expect(updatedProduct.quantity).to.equal(3);
    });
  
    it("DELETE /carts/:cid/products/:pid - Debe eliminar producto del carrito", async () => {
     
      await requester
        .post(`/carts/${cartId}/products/${tempProductId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 1 });

      
      const response = await requester
        .delete(`/carts/${cartId}/products/${tempProductId}`)
        .set("Authorization", `Bearer ${userToken}`);
      
      expect(response.status).to.equal(200);
      
      const deletedProduct = response.body.products.find(
        p => p.product === tempProductId
      );
      expect(deletedProduct).to.not.exist;
    });
  
    it("DELETE /carts/:cid - Debe vaciar el carrito", async () => {
      
      await requester
        .post(`/carts/${cartId}/products/${tempProductId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 1 });

      
      const response = await requester
        .delete(`/carts/${cartId}`)
        .set("Authorization", `Bearer ${userToken}`);
      
      expect(response.status).to.equal(200);
      expect(response.body.products).to.have.lengthOf(0);
    });
  
    it("GET /carts/:cid/purchase - Debe finalizar compra (user)", async () => {
      
      await requester
        .post(`/carts/${cartId}/products/${tempProductId}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantity: 2 });

      
      const response = await requester
        .get(`/carts/${cartId}/purchase`)
        .set("Authorization", `Bearer ${userToken}`);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("ticket");
      expect(response.body).to.have.property("unprocessed");
    });
});


