import {sequelize} from "../../db.js";

export default class StatsRepository {

    async getAllStats() {

        const theLongestMovie = await sequelize.query('SELECT * FROM "movies" WHERE "length" = (SELECT MAX ("length") FROM "movies");')

        const theFastestStarship = await sequelize.query('SELECT * FROM "starships" WHERE "mglt" = (SELECT MAX ("mglt") FROM "starships");')

        const theTallestPerson = await sequelize.query('SELECT * FROM "people" WHERE "height" = (SELECT MAX ("height") FROM "people");')

        return { movie: theLongestMovie[0][0], starships:  theFastestStarship[0][0], person: theTallestPerson[0][0] };
    }
}