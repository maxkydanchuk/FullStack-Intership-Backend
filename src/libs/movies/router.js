import {Router} from "express";

function MoviesRouter(controller) {
    const router = Router();

    router.get('/api/movies', (req, res) => {
        return controller.getAllMovies(req, res);
    });

    router.get('/api/movies/:id', (req, res) => {
        return controller.getMovie(req, res);
    });

    return router;
}

export default MoviesRouter;