const eventRepository = require('../data/repositories/events.repository')

class Events {
    constructor(eventRepository) {
        this._eventRepository = eventRepository
    }

    async createOdd(data){
        const result = await this._eventRepository.createOdd(data)
        return result[0]
    }

    async findEvent(id){
        const result = await this._eventRepository.findEvent(id)
        return result[0]
    }

    async findOdd(id){
        const result = await this._eventRepository.findOdd(id)
        return result[0]
    }

    async addEvent(data){
        const result = await this._eventRepository.addEvent(data)
        return result[0]
    }

    async updateEvent(id,data) {
        const result = await this._eventRepository.updateEvent(id,data)
        return result[0]
    }
}

const eventService = new Events(eventRepository)

module.exports = eventService