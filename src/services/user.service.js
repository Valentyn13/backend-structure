const userRepository = require("../data/repositories/user.repository");
const statEmitter = require("../socket/connection");

class User {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async getUserById(id) {
    const result = await this._userRepository.getById(id);
    return result[0];
  }

  async createUser(data) {
    const result = await this._userRepository.create(data);
    const user = result[0];

    user.createdAt = user.created_at;
    delete user.created_at;
    user.updatedAt = user.updated_at;
    delete user.updated_at;
    statEmitter.emit("newUser");

    return user;
  }

  async updateUser(id, data) {
    const result = await this._userRepository.update(id, data);
    return result;
  }

  async updateUserBalance(id, balance) {
    return await this._userRepository.updateUserBalance(id, balance);
  }
}

const userService = new User(userRepository);

module.exports = userService;
