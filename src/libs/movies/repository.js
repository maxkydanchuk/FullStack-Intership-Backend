import Movie from "./movie-model.js";
import {Op} from "sequelize";

export default class MoviesRepository {

    async getAllMovies(sortBy, sortOrder, searchQuery, pageSize, pageNumber) {

        let totalCount = await Movie.count();
        let options = {};
        let data;

        if (searchQuery !== undefined) {
            options.where = {
                title: {
                    [Op.like]: '%' + searchQuery + '%'
                }
            }
        }

        if (!isNaN(pageSize) && !isNaN(pageNumber)) {
            options.limit = pageSize;
            options.offset = pageSize * pageNumber
        }

        if ((sortBy !== undefined && sortBy !== 'fields.undefined') || (sortOrder !== undefined && sortOrder !== '')) {
            options.order = [
                [sortBy, sortOrder]
            ]
        }

        data = await Movie.findAll(options);

        return {data, totalCount};
    }

    async getMovie(id) {
        return await Movie.findOne({where: {id: id}})
    }
}