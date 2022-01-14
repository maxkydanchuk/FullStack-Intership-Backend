import ChatHelper from "./chat-helper/chat-helper.js";

export default class ChatController {
    constructor(chatRepository) {
        this.chatRepository = chatRepository
    }

    // conncection method
    getAllMessages = async (req, res) => {
        try {
            const result = await this.chatRepository.getAllMessages();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    createMessage = async(req, res) => {
        try {
            const body = await ChatHelper.createMessageFromBody(req.body);
            const result = await this.chatRepository.createMessage(body);

            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}