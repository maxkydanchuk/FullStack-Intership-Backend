import {ObjectId} from "mongodb";
import {escapeRegExp} from '../../utils/utils.js'
import Person from "./person-model.js";

export default class PeopleRepository {

    async getAllPeople(sortBy, sortOrder, searchQuery, pageSize, pageNumber) {

        let totalCount = await Person.count();
        let options = {};
        let data;
        if (searchQuery !== undefined) {
            options = {
                "fields.name": {$regex: escapeRegExp(searchQuery), $options: "i"}
            }
        }

        if ((sortBy === undefined || sortBy === 'fields.undefined') || (sortOrder === undefined || sortOrder === '')) {
            data = await Person
                .find(options)
                .skip(pageNumber * pageSize)
                .limit(pageSize)

            return {data, totalCount};
        }

        data = await Person
            .find(options)
            .skip(pageNumber * pageSize)
            .limit(pageSize)
            .sort({[sortBy]: sortOrder});

        return {data, totalCount};
    };

    async getPerson(id) {
        return await Person.findOne({_id: new ObjectId(id)})
    };

    async createPerson(body) {
        const newPerson = new Person({
            fields: {
                name: body.fields.name,
                birth_year: body.fields.birth_year,
                gender: body.fields.gender,
                eye_color: body.fields.eye_color,
                height: body.fields.height,
            }
        });

        return await Person.create(newPerson);
    }

    async updatePerson(id, body) {
        const result = await Person.findOneAndUpdate({_id: new ObjectId(id)}, {$set: body});
        const resultId = result._id;

        return await Person.findOne({_id: resultId})
    };

    async deletePerson(id) {
        return await Person.findOneAndDelete({_id: new ObjectId(id)});

    }
}