import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userDao } from "../persistence/dao/user.dao.js";
import mongoose from "mongoose";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userDao.getOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload: información del usuario
      process.env.JWT_SECRET, // Clave secreta para firmar el token
      { expiresIn: "1h" } // Tiempo de expiración del token
    );

    // Enviar el token como respuesta
    res.status(200).json({ message: "Login successful", token, user });

    // res.status(200).json(user);
  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { password, email, first_name, last_name, age, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userDao.create({
      password: hashedPassword,
      email,
      first_name,
      last_name,
      age,
      role,
    });
    res.json(user);
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  try {
    const { uid } = req.params;
    // console.log(uid, "hola uid");

    if (!uid || !mongoose.Types.ObjectId.isValid(uid)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await userDao.getOne({ _id: uid });
    // console.log("hola", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
    // if (!req.session.user)
    //   return res.status(401).json({ message: "No hay usuario logueado" });

    // res.status(200).json({ user: req.session.user });
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
