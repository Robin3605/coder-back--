import logger from "../helpers/logger.js";

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
      logger.ERROR(error);
      next(error);
    }
  };
};
  
//   import { verifyToken } from "../utils/jwt.js";
// export const authRole = (roless) => {
//   return (req, res, next) => {
//     try {

//       if (roless.includes("user")) return next();
//       const token = req?.cookies?.token;
//       const data = verifyToken(token);
//       const { role, user_id } = data;
//       if (!role || !user_id) return res.json401();
//       const roles = {
//         USER: roless.includes("user"),
//         ADMIN: roless.includes("user"),
//       };
//       if (roles[role]) {
//         req.user = data; 
//         return next();
//       } else {
//         res.json(403);
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };
