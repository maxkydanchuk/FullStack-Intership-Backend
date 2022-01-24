import {ObjectId} from "mongodb";
import {escapeRegExp} from '../../utils/utils.js'
import Person from "./person-model.js";

export default class PeopleRepository {
    constructor(repositoryData) {
        this.repositoryData = repositoryData;
    }

    async getAllPeople(sortBy, sortOrder, searchQuery, pageSize, pageNumber) {

        let totalCount = await this.repositoryData.count();
        let options = {};
        let data;
        if (searchQuery !== undefined) {
            options = {
                "fields.name": {$regex: escapeRegExp(searchQuery), $options: "i"}
            }
        }

        if (sortBy === undefined || sortOrder === undefined) {

            data = await this.repositoryData
                .find(options)
                .skip(pageNumber * pageSize)
                .limit(pageSize);

            return {data, totalCount};
        }

        data = await this.repositoryData
            .find(options)
            .skip(pageNumber * pageSize)
            .limit(pageSize)
            .sort({[sortBy]: sortOrder})

        return {data, totalCount};
    }

    async getPerson(id) {
        return await this.repositoryData.findOne({_id: new ObjectId(id)})
    }

    async createPerson(body) {
        const newPerson = new Person({
            fields: {
                name: body.fields.name,
                gender: body.fields.gender,
                skin_color: body.fields.skin_color,
                hair_color: body.fields.hair_color,
                height: body.fields.height,
                eye_color: body.fields.eye_color,
                mass: body.fields.mass,
                birth_year: body.fields.birth_year
            }
        });

        return await this.repositoryData.create(newPerson);

    }

    async updatePerson(id, body) {
        return await this.repositoryData.findOneAndUpdate({_id: new ObjectId(id)}, {$set: body})
    }

    async deletePerson(id) {
        return await this.repositoryData.findOneAndDelete({_id: new ObjectId(id)});

    }
}