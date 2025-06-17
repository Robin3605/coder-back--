import dotenv from "dotenv";
import { expect } from "chai";
import supertest from "supertest";

dotenv.config();

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing de Usuarios", function() {
    this.timeout(10000);
    
    let adminToken;
    let userId;
    let testUser;
  
    before(async () => {
      testUser = {
        email: `testuser${Date.now()}@example.com`,
        password: "Test1234!",
        first_name: "Test",
        last_name: "User"
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
  
      
      const userRes = await requester.post("/auth/register").send(testUser);
      
      
      if (userRes.body && userRes.body.message && userRes.body.message._id) {
        userId = userRes.body.message._id;
      } else {
        console.error("Error en creación de usuario:", userRes.body);
        throw new Error("Fallo en creación de usuario: _id no encontrado");
      }
    });
  
    after(async () => {
      if (userId) {
        await requester
          .delete(`/users/${userId}`)
          .set("Authorization", `Bearer ${adminToken}`);
      }
    });
  
    it("GET /users - Debe obtener todos los usuarios (admin)", async () => {
      const response = await requester
        .get("/users")
        .set("Authorization", `Bearer ${adminToken}`);
      
      
      if (response.body.docs) {
        expect(response.body.docs).to.be.an("array");
      } else {
        expect(response.body).to.be.an("array");
      }
    });
  
    it("GET /users/:uid - Debe obtener usuario por ID", async () => {
      const response = await requester
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("_id", userId);
    });
  
    it("PUT /users/:uid - Debe actualizar usuario", async () => {
      const updatedData = { first_name: "UpdatedName" };
      const response = await requester
        .put(`/users/${userId}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updatedData);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("first_name", "UpdatedName");
    });
  
    it("DELETE /users/:uid - Debe eliminar usuario (admin)", async () => {
      
      const tempUser = {
        email: `temp${Date.now()}@test.com`,
        password: "Temp1234!",
        first_name: "Temp",
        last_name: "User"
      };
      
      const tempUserRes = await requester.post("/auth/register").send(tempUser);
      
      
      if (tempUserRes.body && tempUserRes.body.message && tempUserRes.body.message._id) {
        const tempUserId = tempUserRes.body.message._id;
  
       
        const response = await requester
          .delete(`/users/${tempUserId}`)
          .set("Authorization", `Bearer ${adminToken}`);
        
        expect(response.status).to.equal(200);
      } else {
        console.error("Error creando usuario temporal:", tempUserRes.body);
        expect.fail("No se pudo crear usuario temporal para prueba de eliminación");
      }
    });
  });
