import { userService } from "../services/users.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    console.log("Error in get all users controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await userService.getOne({ _id: uid });
    res.json(user);
  } catch (error) {
    console.log("Error in get user by id controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await userService.update(uid, req.body);
    res.json(user);
  } catch (error) {
    console.log("Error in update user controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await userService.remove(uid);
    res.json(user);
  } catch (error) {
    console.log("Error in delete user controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
