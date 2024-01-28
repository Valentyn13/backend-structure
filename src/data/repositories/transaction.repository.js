const db = require('../connection')

class Transaction {

    async create(data) {
        return await db("transaction").insert(data).returning("*")
    }
}


const transactionRepository = new Transaction()

module.exports = transactionRepository