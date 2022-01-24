import Message from "./message-model.js";

export default class ChatRepository {
    constructor(repositoryData) {
        this.repositoryData = repositoryData;
    }

    async getAllMessages() {
        return await this.repositoryData.find();
    }


    async createMessage(body) {
        const newMessage = new Message({
            username: body.username,
            message: body.message,
            time: new Date()
        })

        return await this.repositoryData.save(newMessage)
    }

}