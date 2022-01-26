import { Router } from "express";
import verifyUser from "../../middlewares/verifyUser.js";


function PeopleRouter(controller) {
    const router = Router();

    router.get('/api/people', (req, res) => {
        return controller.getAllPeople(req, res)
    });
    router.get('/api/people/:id', (req, res) => {
        return controller.getPerson()(req, res)
    });
    router.post('/api/people/',verifyUser, (req, res) => {
        return controller.createPerson(req, res)
    });
    router.put('/api/people/:id/edit', verifyUser, (req, res) => {
        return controller.updatePerson(req, res)
    });
    router.delete('/api/people/:id',verifyUser, (req, res) => {
        return controller.deletePerson(req, res)
    });

    return router;
}

export default PeopleRouter;