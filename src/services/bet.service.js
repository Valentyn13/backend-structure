const betRepository = require('../data/repositories/bet.repository')

class Bet {
    constructor(betRepository){
        this._betRepository = betRepository
    }

    async createBet(eventId){
        return await this._betRepository.createBet(eventId)
    }

    async updateBet(id, data) {
        return await this._betRepository.updateBet(id, data)
    }

    async getUserByBetUserId(betUserId) {
        return await this._betRepository.getUserByBetUserId(betUserId)
    }

    async updateUserAfterBet(betUserId, data){
        return await this._betRepository.updateUserAfterBet(betUserId, data)
    }

}

const betService = new Bet(betRepository)

module.exports = betService
