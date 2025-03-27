import { createToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const tokenData = {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    };
    const token = createToken(tokenData);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user: req.user, token });
  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    res.status(201).json({ message: req.user });
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
