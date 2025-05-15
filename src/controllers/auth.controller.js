import { UserResponseDto } from "../dto/responseUser.dto.js";
import { createToken } from "../utils/jwt.js";
import { validateData } from "../utils/validationData.js";

export const login = async (req, res, next) => {
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
    next(error)
  }
};

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, age } = req.user;
    validateData({ first_name, last_name, email, password, age });
    res.status(201).json({ message: req.user });
  } catch (error) {
    next(error)
  }
};

export const profile = async (req, res, next) => {
  try {
    const userDto = new UserResponseDto(req.user);
    res.status(200).json({ user: userDto });
  } catch (error) {
    next(error)
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error)
  }
};
