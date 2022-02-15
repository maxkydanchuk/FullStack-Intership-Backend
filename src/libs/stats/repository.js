import {sequelize} from "../../db.js";

export default class StatsRepository {

    async getAllStats() {

        const theLongestMovie = await sequelize.query('SELECT * FROM "movies" WHERE "length" = (SELECT MAX ("length") FROM "movies");');
        const moviesCount = await sequelize.query('SELECT COUNT(*) FROM "movies"');

        const theFastestStarship = await sequelize.query('SELECT * FROM "starships" WHERE "mglt" = (SELECT MAX ("mglt") FROM "starships");');
        const starshipsCount = await sequelize.query('SELECT COUNT(*) FROM "starships"');

        const theTallestPerson = await sequelize.query('SELECT * FROM "people" WHERE "height" = (SELECT MAX ("height") FROM "people");');
        const peopleCount = await sequelize.query('SELECT COUNT(*) FROM "people"');

        const moviesStats = {
            count: moviesCount[0][0].count,
            movie: theLongestMovie[0][0]
        };

        const starshipsStats = {
            count: starshipsCount[0][0].count,
            starship: theFastestStarship[0][0]
        };

        const peopleStats = {
            count: peopleCount[0][0].count,
            person: theTallestPerson[0][0]
        };

        return {
            moviesStats,
            peopleStats,
            starshipsStats
        };
    }
}