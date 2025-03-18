import jwt from "jsonwebtoken";
import { userDao } from "../persistence/dao/user.dao.js";

// export const authRole = (roles) => {
//   return (req, res, next) => {
//     if (!req.session.user) {
//       return res.status(400).json({ status: "error", msg: "No autenticado" });
//     }
//     if (!roles.includes(req.session.user.role)) {
//       return res.status(403).json({ status: "error", msg: "No tiene permiso" });
//     }
//     next();
//   };
// };

export const authRole = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user)
        return res.status(400).json({ status: "error", msg: "No autenticado" });
      if (!roles.includes(req.user.role))
        return res
          .status(403)
          .json({ status: "error", msg: "No tiene permiso" });

      next();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
    }
  };
};

// export const authenticate = async (req, res, next) => {
//   try {
//     // Extraer el token del header "Authorization"
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     // Verificar el token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Buscar el usuario en la base de datos
//     const user = await userDao.getOne({ _id: decoded.id });
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // Establecer req.user con la información del usuario
//     req.user = { _id: user._id, role: user.role };
//     next();
//   } catch (error) {
//     console.log("Error in authentication middleware", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const authRole = async (req, res, next) => {
//   try {
//     console.log("req.user:", req.user);
//     if (req.user && req.user.role === "admin") {
//       return next();
//     } else {
//       return res.status(403).json({ message: "Access denied - Admin only" });
//     }
//   } catch (error) {
//     console.log("Error in admin route middleware", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
