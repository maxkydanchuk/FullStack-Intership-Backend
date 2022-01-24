import express from "express";
import path from "path";
import cors from "cors";
import { PORT } from "./config/config.js";
import peopleRouter from "./libs/people/index.js";
import starshipRouter from "./libs/starships/index.js";
import userRouter from "./libs/users/index.js";
import bodyParser from "body-parser";
import * as http from "http";
import webSocket from "./libs/chat/service.js";
import  mongoose from "mongoose";

const __dirname = path.resolve();
const app = express();
export const server = http.createServer(app);
const url = 'mongodb://localhost:27017/StarWarsDatabase';

app.use(cors({
    exposedHeaders: ['x-access-token']
}));
app.use(bodyParser.json());
app.use(peopleRouter);
app.use(starshipRouter);
app.use(userRouter);

webSocket()

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});


app.use(function(req, res, err) {
    res.status(500).send('Something broke!');
    console.error(err)
});


async function start() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        server.listen(PORT);
    } catch (e) {
        console.log('Server Error: ', e.message);
        process.exit(1);
    }
}

start();


