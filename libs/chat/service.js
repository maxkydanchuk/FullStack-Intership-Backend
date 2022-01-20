import {Server} from "socket.io";
import {server} from "../../index.js";
import ChatRepository from "./repository.js";
import mongoClient from "../../db.js";
import ChatHelper from "./chat-helper/chat-helper.js";

const db = mongoClient.db('StarWarsDatabase').collection('chat');

const chatRepository = new ChatRepository(db);

let users = [];
export default function webSocket() {

    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    io.on("connect", async (socket) => {

        let currentSocketUser;

        socket.on('joinChat', (username) => {
                currentSocketUser = username
            if(users.find(item => item === currentSocketUser)) {
                io.emit('sendUser', users)
            } else if (!currentSocketUser || currentSocketUser.length === 0) {
                return false
            } else {
                users.push(currentSocketUser);
                io.emit('sendUser', users)
            }
        })

        socket.on('refreshUsers', () => {
            users = users.filter((item) => item !== currentSocketUser);
            io.emit('sendUser', users)
        })

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