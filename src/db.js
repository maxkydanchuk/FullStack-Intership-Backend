import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(url);

mongoClient.connect()
    .then((db) => db)
    .catch((err) => console.log(err))

export default mongoClient;
