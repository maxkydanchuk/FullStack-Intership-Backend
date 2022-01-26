import {Server} from "socket.io";
import {server} from "../../index.js";
import ChatRepository from "./repository.js";

const chatRepository = new ChatRepository();

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
            await chatRepository.createMessage(message);
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