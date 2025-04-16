import { userDao } from "../persistence/dao/user.dao.js";

class UserService {
  async getAll() {
    return await userDao.getAll();
  }

  async getOne(query) {
    return await userDao.getOne(query);
  }
  async create(data) {
    return await userDao.create(data);
  }
  async update(id, data) {
    return await userDao.update(id, data);
  }
  async remove(id) {
    return await userDao.remove(id);
  }
}

export const userService = new UserService();
