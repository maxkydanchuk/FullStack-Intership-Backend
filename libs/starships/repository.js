import {ObjectId} from 'mongodb'
import {escapeRegExp} from "../../utils/utils.js";
import Starship from "./starship-model.js";

export default class StarshipsRepository {

    async getAllStarships(sortBy, sortOrder, searchQuery, pageSize, pageNumber) {
        let totalCount = await Starship.count();
        let options = {}
        let data;
        if (searchQuery !== undefined) {
            options = {
                "fields.starship_class": {$regex: escapeRegExp(searchQuery), $options: "i"}
            }
        }

        if (sortBy === undefined || sortOrder === undefined) {
            const data = await Starship.find(options).skip(pageNumber * pageSize).limit(pageSize);

            return {data, totalCount}
        }

        data = await Starship.find(options).sort({[sortBy]: sortOrder}).skip(pageNumber * pageSize).limit(pageSize);

        return {data, totalCount};
    }

    async getStarship(id) {
        return await Starship.findOne({_id: new ObjectId(id)});
    }

    async createStarship(body) {
        const newStarship = new Starship({
            fields: {
                pilots: body.fields.pilots,
                MGLT: body.fields.MGLT,
                starship_class: body.fields.starship_class,
                hyperdrive_rating: body.fields.hyperdrive_rating,
            }
        });
        return await newStarship.save()
    }

    async updateStarship(id, body) {
        return await Starship.findOneAndUpdate({_id: new ObjectId(id)}, body)
    }

    async deleteStarship(id) {
        return await Starship.findOneAndDelete({_id: new ObjectId(id)});
    }
}