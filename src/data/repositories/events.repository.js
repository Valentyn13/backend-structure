const db = require("../connection");

class Event {
  async createOdd(data) {
    return await db("odds").insert(data).returning("*");
  }

  async findEvent(id){
    return await db("event").where("id",id)
  }

  async findOdd (id){
    return await db("odds").where("id",id)
  }

  async addEvent(data) {
    return await db("event").insert(data).returning("*");
  }

  async updateEvent(id,data) {
    return await db("event").where("id", id).update(data).returning("*")
  }
}

const eventRepository = new Event();

module.exports = eventRepository;
