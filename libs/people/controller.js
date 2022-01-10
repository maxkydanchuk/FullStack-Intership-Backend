export default class PeopleController {
    constructor(peopleRepository) {
        this.peopleRepository = peopleRepository;
    }

    getDataFromBody(body) {
        return {
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
        };
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
            const body = this.getDataFromBody(req.body);
            const createItem = await this.peopleRepository.createPerson(body)
            const getItem = await this.peopleRepository.getPerson(createItem.insertedId)

            return res.status(201).json(getItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    updatePerson = async (req, res) => {
        try {
            const body = this.getDataFromBody(req.body);
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
