import PeopleHelper from "./people-helper/people-helper.js";

export default class PeopleController {
    constructor(peopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    getAllPeople = async (req, res) => {
        try {
            const sortBy = req.query.sortBy;
            const sortOrder = req.query.sortOrder;
            const searchQuery = req.query.search;
            const pageSize = Number(req.query.size);
            const pageNumber = Number(req.query.page);
            const result = await this.peopleRepository.getAllPeople(sortBy, sortOrder, searchQuery, pageSize, pageNumber);

            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    getPerson = async (req, res) => {
        try {
            const id = req.params.id
            const result = await this.peopleRepository.getPerson(id);

            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    createPerson = async (req, res) => {
        try {
            const body = PeopleHelper.getDataFromBody(req.body);
            const result = await this.peopleRepository.createPerson(body);

            return res.status(201).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    updatePerson = async (req, res) => {
        try {
            const body = PeopleHelper.getDataFromBody(req.body);
            const id = req.params.id;
            await this.peopleRepository.updatePerson(id, body);
            const getItem = await this.peopleRepository.getPerson(id);

            return res.status(200).json(getItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    deletePerson = async (req, res) => {
        try {
            const id = req.params.id;
            await this.peopleRepository.deletePerson(id);

            return await res.status(200).json(id);
        } catch (e) {
            return await res.status(400).json(e);
        }
    }
}
