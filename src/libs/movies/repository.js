import {ObjectId} from "mongodb";
import {escapeRegExp} from '../../utils/utils.js'
import Movie from "./movie-model.js";

export default class MoviesRepository {

    async getAllPeople(sortBy, sortOrder, searchQuery, pageSize, pageNumber) {

        let totalCount = await Movie.count();
        let options = {};
        let data;
        if (searchQuery !== undefined) {
            options = {
                "fields.name": {$regex: escapeRegExp(searchQuery), $options: "i"}
            }
        }

        if (sortBy === undefined || sortOrder === undefined) {

            data = await Movie
                .find(options)
                .skip(pageNumber * pageSize)
                .limit(pageSize);

            return {data, totalCount};
        }

        data = await Movie
            .find(options)
            .skip(pageNumber * pageSize)
            .limit(pageSize)
            .sort({[sortBy]: sortOrder})

        return {data, totalCount};
    }

    async getMovie(id) {
        return await Movie.findOne({_id: new ObjectId(id)})
    }
}