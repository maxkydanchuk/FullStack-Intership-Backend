import supertest from 'supertest';
import {expect, jest} from '@jest/globals';
import UserController from "./controller.js";
import UserHelper from "./user-helper/user-helper.js";
import MockRepository from "./__mocks__/mockRepository.js";
import * as httpMocks from 'node-mocks-http';

jest.mock('./controller.js')
jest.mock('./repository.js')
jest.mock('./__mocks__/mockRepository.js');

let userController;
let mockRepository;

const mockRequest = httpMocks.createRequest(({body: {email: 'email', password: 'password'}}));

const mockUser = {
    email: 'email',
    password: 'password'
}

beforeEach(() => {
     mockRepository = new MockRepository()
     userController = new UserController(mockRepository);
})

it('check if controller called a mocked repo',  () => {
    jest.spyOn(mockRepository, 'validateLoginUser');

    const mockResponse = httpMocks.createResponse();
    const get = userController.getUser(mockRequest, mockResponse);

    expect(mockRepository.validateLoginUser).toBeCalled()
})

it('check if getUser returns correct data', async () => {
    jest.spyOn(userController, 'getUser');

    const mockResponse = httpMocks.createResponse();
    const get = await userController.getUser(mockRequest, mockResponse);
    const response = get._getJSONData();

    expect(response.email).toEqual('email')
})

it('check if createUser works', async () => {
    jest.spyOn(userController, 'createUser');

    const mockResponse = httpMocks.createResponse();
    const create = await userController.createUser(mockRequest, mockResponse);
    const response = create._getJSONData()

    expect(response).toEqual({email: 'email', password: 'password'})
})

describe('get user',  () => {
    it('get user',  async () => {
        const result = await UserHelper.encryptPassword(mockUser.password);

        expect(result).toMatch('$2b$12$')
    })
})