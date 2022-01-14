import { Router } from "express";

function ChatRouter(controller) {
    const router = new Router();

    router.get('/api/chat', (req, res) => {
        return controller.getAllMessages(req, res);
    })

    return router;
}

export default ChatRouter;