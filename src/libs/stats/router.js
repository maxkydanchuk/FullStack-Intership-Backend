import {Router} from "express";

function StatsRouter(controller) {
    const router = new Router();

    router.get('/api/statistic', (req, res) => {
        return controller.getAllStats(req, res);
    })

    return router;
}

export default StatsRouter;