const db = require('../connection')

class Bet {

    async createBet(eventId){
        return await db("bet").where("event_id", eventId).andWhere("win", null)
    }

    async updateBet(id, data) {
        db("bet").where("id", id).update(data)
    }

    async getUserByBetUserId(betUserId) {
        return await db("user").where("id", betUserId)
    }

    async updateUserAfterBet(betUserId, data){
       return await db("user").where("id", betUserId).update(data);
    }
}


const betRepository = new Bet()

module.exports = betRepository