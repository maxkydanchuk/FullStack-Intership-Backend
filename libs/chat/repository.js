import {ObjectId} from "mongodb";

export default class ChatRepository {
    constructor(repositoryData) {
        this.repositoryData = repositoryData.db('StarWarsDatabase').collection('chat');
    }

    async getAllMessages() {
        return await this.repositoryData.find().toArray();
    }

    async getMessageById(id) {
        return await this.repositoryData.findOne({_id: new ObjectId(id)});
    }

    async createMessage(body) {
        const newMessage = await this.repositoryData.insertOne(body);

        return await this.getMessageById(newMessage.insertedId)
    }

}