export default class ChatHelper {

    static createMessageFromBody(body) {
        return {
            username: body.username,
            message: body.message,
            time: new Date()
        }
    }

}