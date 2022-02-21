import {Message} from '../associations.js'

export default class ChatRepository {

    async getAllMessages() {
        return await Message.findAll()
    };

    async createMessage(body) {
        return await Message.create(body, {fields: ['username', 'message', 'userId']})
    }
};