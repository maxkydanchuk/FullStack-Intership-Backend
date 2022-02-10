import Message from "./message-model.js";

export default class ChatRepository {

    async getAllMessages() {
        return await Message.find();
    };

    async createMessage(body) {
        const newMessage = new Message({
            username: body.username,
            message: body.message,
            time: new Date()
        });

        return await Message.create(newMessage);
    }
};