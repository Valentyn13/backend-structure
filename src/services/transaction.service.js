const transactionRepository = require("../data/repositories/transaction.repository");

class Transaction {
  constructor(transactionRepository) {
    this._transactionRepository = transactionRepository;
  }

  async createTransaction(data) {
    return await this._transactionRepository.create(data);
  }
}

const transactionService = new Transaction(transactionRepository);

module.exports = transactionService;
