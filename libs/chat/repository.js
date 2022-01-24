import {ObjectId} from "mongodb";
import Message from "./message-model.js";

export default class ChatRepository {
    constructor(repositoryData) {
        this.repositoryData = repositoryData;
    }
    
    async getAllMessages() {
        return await this.repositoryData.find();
    }

    async getMessageById(id) {
        return await this.repositoryData.findOne({_id: new ObjectId(id)});
    }

    async createMessage(body) {
        const newMessage = new Message({
            username: body.username,
            message: body.message,
            time: new Date()
        })

        return await newMessage.save()
    }

}