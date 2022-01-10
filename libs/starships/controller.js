export default class StarshipsController {
    constructor(starshipsRepository ) {
        this.starshipsRepository = starshipsRepository;
    }

    getDataFromBody (body) {
        return {
            fields: {
                pilots: body.fields.pilots,
                MGLT: body.fields.MGLT,
                starship_class: body.fields.starship_class,
                hyperdrive_rating: body.fields.hyperdrive_rating,
            }
        };
    }

    getAllStarships = async (req, res) =>  {
        try {
            const sortBy = req.query.sortBy;
            const sortOrder = req.query.sortOrder;
            const searchQuery = req.query.search;
            const pageSize = Number(req.query.size);
            const pageNumber = Number(req.query.page);
            const result = await this.starshipsRepository.getAllStarships(sortBy, sortOrder, searchQuery, pageSize, pageNumber);

            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    getStarship = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await this.starshipsRepository.getStarship(id);

            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    createStarship = async (req, res) => {
        try {
            const body = this.getDataFromBody(req.body);
            const createItem = await this.starshipsRepository.createStarship(body);
            const getItem = await this.starshipsRepository.getStarship(createItem.insertedId);

            return res.status(201).json(getItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    updateStarship = async (req, res) => {
        try {
            const body = this.getDataFromBody(req.body);
            const id = req.params.id;
            await this.starshipsRepository.updateStarship(id, body);
            const getItem = await this.starshipsRepository.getStarship(id);

            return res.status(200).json(getItem);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

      deleteStarship = async (req, res) => {
        try {
            const id = req.params.id;
            await this.starshipsRepository.deleteStarship(id);

            return res.status(200).json(id);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}
