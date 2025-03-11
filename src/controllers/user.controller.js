import { userDao } from "../persistence/dao/user.dao.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userDao.getAll();
    res.json(users);
  } catch (error) {
    console.log("Error in get all users controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await userDao.getOne({ _id: uid });
    res.json(user);
  } catch (error) {
    console.log("Error in get user by id controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
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
    console.log("Error in create user controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await userDao.update(uid, req.body);
    res.json(user);
  } catch (error) {
    console.log("Error in update user controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await userDao.remove(uid);
    res.json(user);
  } catch (error) {
    console.log("Error in delete user controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
