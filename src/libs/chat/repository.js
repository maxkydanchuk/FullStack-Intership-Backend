import Message from "./message-model.js";

export default class ChatRepository {

    async getAllMessages() {
        return await Message.findAll()
    };

    async createMessage(body) {
        return await Message.create(body,{fields: ['username', 'message']});
    }
};