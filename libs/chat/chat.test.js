import supertest from 'supertest';
import {expect, jest} from '@jest/globals';
import * as http from "http";
import {Server} from "socket.io";
import  Client  from "socket.io-client";
import MockDb from "./__mocks__/mockDb.js";
import ChatRepository from "./repository.js";

// send messages test

jest.mock( './service.js');
jest.mock('./repository.js');

let mockDb;
let chatRepository;

const resultPromise = new Promise((resolve) => { resolve()});

const mockMessage = {
    username: 'email',
    message: 'message'
}

const mockResultMessage = {
    _id: 'id',
    username: 'email',
    message: 'message',
    time: 'time'
}

beforeEach( () => {
   mockDb = new MockDb;
   chatRepository = new ChatRepository(mockDb)
})

it('check if getMessageById returned promise',  () => {

    jest.spyOn(chatRepository, 'getMessageById');

    expect(chatRepository.getMessageById()).toStrictEqual(resultPromise)
})

it('check if getMessageById returned equal value',  async () => {
    jest.spyOn(chatRepository, 'getMessageById');

    expect(await chatRepository.getMessageById()).toEqual(mockResultMessage)
})

// websocket connect test

describe("my awesome project", () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = http.createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });

    it('socket connect', (done) => {
        clientSocket.on('connection', (message) => {
            expect(message).toBe('connected')
            done();
        })
        serverSocket.emit('connection', 'connected');
    })

    it('send message', (done) => {
        clientSocket.emit('sendMessage', mockMessage);
        serverSocket.on('sendMessage', async (message) => {
            jest.spyOn(chatRepository, 'createMessage');

            const result = await chatRepository.createMessage(message)

            expect(result).toEqual(mockResultMessage);
            done()
        })
    })

    afterAll(() => {
        io.close();
        clientSocket.close();
    });
});


