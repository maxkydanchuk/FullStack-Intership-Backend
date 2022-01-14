import {Server} from "socket.io";
import {server} from "../../index.js";
import ChatRepository from "./repository.js";
import mongoClient from "../../db.js";
import ChatHelper from "./chat-helper/chat-helper.js";

const chatRepository = new ChatRepository(mongoClient)

export default function webSocket() {

    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    io.on("connection", async (socket) => {

        socket.on('sendMessage', async (message) => {
            const newMessage = ChatHelper.createMessageFromBody(message)
            await chatRepository.createMessage(newMessage);
        })

        socket.on('requestMessages', async () => {
            const messages = await chatRepository.getAllMessages();
            io.emit('getMessages', messages)
        });

    });


    io.on('disconnect', () => {
        console.log('disconnected')
    })
}


