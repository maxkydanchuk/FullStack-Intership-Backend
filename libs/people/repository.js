import {ObjectId} from "mongodb";
import {escapeRegExp} from '../../utils/utils.js'

export default class PeopleRepository {
    constructor(repositoryData) {
        this.repositoryData = repositoryData.db('StarWarsDatabase').collection('people');
    }

    async getAllPeople(sortBy, sortOrder, searchQuery, pageSize, pageNumber) {

        let totalCount = await this.repositoryData.count();
        let options = {};
        if (searchQuery !== undefined) {
            options = {
                "fields.name": {$regex: escapeRegExp(searchQuery), $options: "i"}
            }
        }

        let cursor = await this.repositoryData.find(options)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        if (sortBy === undefined || sortOrder === undefined) {
            const data = await cursor.toArray();
            return {data, totalCount};
        }
        const data = await cursor.sort(sortBy, sortOrder).toArray();
        return {data, totalCount};
    }

    async getPerson(id) {
        return await this.repositoryData.findOne({_id: new ObjectId(id)})
    }

    async createPerson(body) {
        const newPerson = {
            ...body,
            model: "resources.people",
        };

        return await this.repositoryData.insertOne(newPerson)
    }

    async updatePerson(id, body) {
        return await this.repositoryData.updateOne({_id: new ObjectId(id)}, {$set: body})
    }

    async deletePerson(id) {
        return await this.repositoryData.findOneAndDelete({_id: new ObjectId(id)});

    }
}