export default class MockRepository {

    async validateLoginUser() {
        return true
    };

    async validateRegisterUser() {

    };

    async getUser(body) {
        return {
            email: body
        }
    };

    async createUser(body) {
        return {
            email: body.email,
            password: body.password
        }
    };
}

