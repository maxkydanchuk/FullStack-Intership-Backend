import { Router } from "express";


function UsersRouter(controller) {
    const router = Router();

    router.post('/api/login/' ,(req, res) => {
        return controller.getUser(req, res)
    })

    router.post('/api/register/', (req, res) => {
        return controller.createUser(req, res)
    })

    return router
}

export default UsersRouter;