import dotenv from "dotenv";
import { expect } from "chai";
import supertest from "supertest";

dotenv.config();

const requester = supertest(`http://localhost:${process.env.PORT}/api`);


describe("TESTING: Rutas de Auth/Users", function() {
    this.timeout(5000); 
  
    const admin = { email: "rene@gmail.com", password: "123456" };
    let userId;
    let cookies;
    let testUserEmail;
  
    after(async () => {
      if (userId) {
        await requester
          .delete("/users/" + userId)
          .set("Cookie", cookies)
          .catch(() => {});
      }
    });
  
    it("POST /auth/register → Error 401 al registrar usuario existente", async () => {
      const response = await requester.post("/auth/register").send(admin);
      expect(response.status).to.equal(401);
      expect(response.body).to.have.property("status", "error");
      expect(response.body).to.have.property("msg", "El usuario ya existe");
    });
  
    it("POST /auth/register → Crea usuario nuevo (201)", async () => {
      testUserEmail = `test${Date.now()}@gmail.com`;
      
      const response = await requester.post("/auth/register").send({
        email: testUserEmail,
        password: "1234"
      });
      
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.have.property("_id");
      userId = response.body.message._id;
    });
  
    it("POST /auth/login → Éxito (200)", async () => {
      const response = await requester.post("/auth/login").send(admin);
      cookies = response.headers["set-cookie"];
      expect(response.status).to.equal(200);
      expect(cookies).to.be.an("array").that.is.not.empty;
    });
  
    it("POST /auth/login → Devuelve token y usuario", async () => {
      const response = await requester.post("/auth/login").send(admin);
      expect(response.body).to.have.property("token");
      expect(response.body).to.have.property("user");
      expect(response.body.user.email).to.equal(admin.email);
    });
  
    it("GET /auth/profile → Devuelve profile (200)", async () => {
      const response = await requester
        .get("/auth/profile")
        .set("Cookie", cookies);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property("email", admin.email);
    });
  
    it("POST /auth/logout → Éxito (200)", async () => {
      const response = await requester
        .post("/auth/logout")
        .set("Cookie", cookies);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "Logout successful");
    });
  });