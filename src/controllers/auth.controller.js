// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { userDao } from "../persistence/dao/user.dao.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { createToken } from "../utils/jwt.js";
// import mongoose from "mongoose";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getOne({ email });

    if (!user || !comparePassword(user.password, password)) {
      return res.status(401).json({ message: "Email o password invalido" });
    }
    // Guardamos la información del usuario en las session
    // req.session.user = user;

    // Creamos un token
    const tokenInfo = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = createToken(tokenInfo);

    // Guardamos el token en una cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userDao.getOne({ email });
    if (user) return res.status(400).json({ message: "Ya hay un usuario registrado con ese email" });
    const newUserData = {
      ...req.body,
      password: hashPassword(req.body.password),
    };
    // Crear un nuevo usuario
    const newUser = await userDao.create(newUserData);

    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("Error in profile controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// aVzQaOzrevVRzjyk
