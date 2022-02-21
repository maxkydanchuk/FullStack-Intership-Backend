import Person from "./person-model.js";
import {Op} from "sequelize";

export default class PeopleRepository {

    async getAllPeople(sortBy, sortOrder, searchQuery, pageSize, pageNumber) {

        let totalCount = await Person.count();
        let options = {};
        let data;

        if (searchQuery !== undefined) {
            options.where = {
                name: {
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

        data = await Person.findAll(options);

        return {data, totalCount};
    };

    async getPerson(id) {
       try {
           return await Person.findOne({where: {id: id}});
       } catch (e) {
           return e;
       }
    };

    async createPerson(body) {
        return await Person.create(body, {fields: ['name', 'birth_year', 'gender', 'eye_color', 'height']});
    }

    async updatePerson(id, body) {
        await Person.update(body, {where: {id: id}});

        return await Person.findOne({where: {id: id}});
    };

    async deletePerson(id) {
        return await Person.destroy({where: {id: id}})

    }
}