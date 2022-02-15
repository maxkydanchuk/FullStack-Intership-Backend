export default class StatsController {
    constructor(statsRepository) {
        this.statsRepository = statsRepository
    }

     getAllStats = async (req, res) => {
        try {
            const result = await this.statsRepository.getAllStats();

            return res.status(200).json(result);
        } catch (e) {
            return e
        }
     }
}