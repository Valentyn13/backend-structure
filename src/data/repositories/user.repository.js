const db = require("../connection");

class User {
  async getById(id) {
    return await db("user").where("id", id).returning("*");
  }

  async create(user) {
    return await db("user").insert(user).returning("*");
  }

  async update(id, data) {
    return await db("user").where("id", id).update(data).returning("*");
  }

  async updateUserBalance(id, balance) {
    return await db("user").where("id", id).update("balance", balance);
  }
}

const userRepository = new User();

module.exports = userRepository;
