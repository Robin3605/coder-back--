import swaggerJsDoc from "swagger-jsdoc";
import __dirname from ".././dirname.js";
import path from "path";

const opts = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "CODER BACK |||",
      description: "Documentación de la API de Coder Back |||",
    },
  },
  apis: [path.join(__dirname, "docs/*.yaml")],
};

const swaggerSpecs = swaggerJsDoc(opts);

export default swaggerSpecs;