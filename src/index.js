import express from "express";
import path from "path";
import cors from "cors";
import 'dotenv/config';
import { PORT, DATABASE_URI } from "./config/config.js";
import peopleRouter from "./libs/people/index.js";
import starshipRouter from "./libs/starships/index.js";
import userRouter from "./libs/users/index.js";
import moviesRouter from "./libs/movies/index.js";
import bodyParser from "body-parser";
import * as http from "http";
import webSocket from "./libs/chat/service.js";
import  mongoose from "mongoose";

const __dirname = path.resolve();
const app = express();
export const server = http.createServer(app);

app.use(cors({
    exposedHeaders: ['x-access-token']
}));
app.use(bodyParser.json());
app.use(peopleRouter);
app.use(starshipRouter);
app.use(userRouter);
app.use(moviesRouter);

webSocket()

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/index.html'));
});


app.use(function(req, res, err) {
    res.status(500).send('Something broke!');
});


async function start() {
    try {
        await mongoose.connect(DATABASE_URI, {
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


