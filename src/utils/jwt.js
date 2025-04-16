import jwt from "jsonwebtoken";

// Función que crea el token
export const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "5m" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
