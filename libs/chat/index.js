import ChatRepository from "./repository.js";
import ChatController from "./controller.js";
import ChatRouter from "./router.js";
import mongoClient from "../../db.js";

const chatRepository = new ChatRepository(mongoClient);

const chatController = new ChatController(chatRepository);

const chatRouter = new ChatRouter(chatController);

export default chatRouter;



























// import ws from 'ws'
//
// const wss = new ws.Server({
//     port: 5000
// }, () => console.log('Server started on port 5000'))
//
// wss.on('connection', (ws) => {
//     ws.on('message', (message) => {
//         message = JSON.parse(message);
//         switch (message.event) {
//             case 'message': {
//                 broadcastMessage(message)
//             } break;
//             case 'connection': {
//                 broadcastMessage(message)
//             } break;
//         }
//     });
// });
//
// function broadcastMessage (message) {
//     wss.clients.forEach((client) => {
//         client.send(JSON.stringify(message));
//     })
// }