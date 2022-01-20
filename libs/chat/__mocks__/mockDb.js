export default class MockDb {

    async findOne() {
        return {
            _id: 'id',
            username: 'email',
            message: 'message',
            time: 'time'

        }
    }
}

