import { userService } from "../services/users.service.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const user = await userService.getOne({ _id: uid });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const user = await userService.update(uid, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const user = await userService.remove(uid);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
