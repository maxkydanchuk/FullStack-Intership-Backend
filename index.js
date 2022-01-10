import express from "express";
import path from "path";
import cors from "cors";
import { PORT } from "./config/config.js";
import peopleRouter from "./libs/people/index.js";
import starshipRouter from "./libs/starships/index.js";
import userRouter from "./libs/users/index.js";
import bodyParser from "body-parser";


const __dirname = path.resolve();
const app = express();

app.use(cors({
    exposedHeaders: ['x-access-token']
}));
app.use(bodyParser.json());
app.use(peopleRouter);
app.use(starshipRouter);
app.use(userRouter);


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});


app.use(function(err, req, res, next) {
    res.status(500).send('Something broke!');
    console.error(err)
});


app.listen(PORT);


