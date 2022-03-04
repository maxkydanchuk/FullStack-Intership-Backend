export default class MoviesController {
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }

    getAllMovies = async (req, res) => {
        try {
            const sortBy = req.query.sortBy;
            const sortOrder = req.query.sortOrder;
            const searchQuery = req.query.search;
            const pageSize = Number(req.query.size);
            const pageNumber = Number(req.query.page);

            const result = await this.moviesRepository.getAllMovies(sortBy, sortOrder, searchQuery, pageSize, pageNumber);

            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }

    getMovie = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await this.moviesRepository.getMovie(id);

            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json(e);
        }
    }
}