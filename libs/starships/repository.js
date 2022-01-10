import {ObjectId} from 'mongodb'
import { escapeRegExp } from "../../utils/utils.js";

export default class StarshipsRepository {
    constructor(repositoryData) {
        this.repositoryData = repositoryData.db('StarWarsDatabase').collection('starships');
    }

     async getAllStarships (sortBy, sortOrder, searchQuery, pageSize, pageNumber) {
        let totalCount = await this.repositoryData.count();
        let options = {}

            if(searchQuery !== undefined) {
                options = {
                    "fields.starship_class": {$regex: escapeRegExp(searchQuery), $options: "i"}
                }
            }

            let cursor = await this.repositoryData.find(options)
                .skip(pageNumber * pageSize)
                .limit(pageSize);

            if(sortBy === undefined || sortOrder === undefined) {
                const data = await cursor.toArray();
                return {data, totalCount}
            }

         const data = await cursor.sort(sortBy, sortOrder).toArray();

         return {data, totalCount};
    }

    async getStarship (id) {
        return await this.repositoryData.findOne({_id: new ObjectId(id)});
    }

    async createStarship (body) {
        const newStarship =  {
            ...body,
                model: "resources.starship"
            };

       return await this.repositoryData.insertOne(newStarship);
    }

   async updateStarship (id, body) {
       return await this.repositoryData.updateOne({_id: new ObjectId(id)}, {$set: body});
    }

    async deleteStarship (id)  {
        return this.repositoryData.findOneAndDelete({_id: new ObjectId(id)});
    }
}