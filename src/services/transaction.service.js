const transactionRepository = require('../data/repositories/transaction.repository')
// const userRepository = require('../data/repositories/user.repository')

class Transaction {
    constructor(transactionRepository, ){
        this._transactionRepository = transactionRepository
    }

    async createTransaction(data){
       return await this._transactionRepository.create(data)
    }
}


const transactionService = new Transaction(transactionRepository)

module.exports = transactionService