import StatsRepository from "./repository.js";
import StatsController from "./controller.js";
import StatsRouter from "./router.js";

const statsRepository = new StatsRepository();

const statsController = new StatsController(statsRepository);

const statsRouter = new StatsRouter(statsController)

export default statsRouter;