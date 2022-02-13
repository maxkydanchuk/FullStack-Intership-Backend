import Starship from "./starship-model.js";
import {Op} from "sequelize";

export default class StarshipsRepository {

    async getAllStarships(sortBy, sortOrder, searchQuery, pageSize, pageNumber) {
        let totalCount = await Starship.count();
        let options = {};
        let data;

        if (searchQuery !== undefined) {
            options.where = {
                starship_class: {
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

        data = await Starship.findAll(options);

        return {data, totalCount};
    };

    async getStarship(id) {
        return await Starship.findOne({where: {id: id}});
    };

    async createStarship(body) {
        return await Starship.create(body, {fields: ['pilots', 'mglt', 'starship_class', 'hyperdrive_rating']});
    };

    async updateStarship(id, body) {
        await Starship.update(body, {where: {id: id}});

        return await Starship.findOne({where: {id: id}});
    };

    async deleteStarship(id) {
        return await Starship.destroy({where: {id: id}})
    };
}