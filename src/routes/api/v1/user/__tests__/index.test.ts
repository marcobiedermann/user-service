import faker from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../../../../app';
import * as userService from '../../../../../services/user';

jest.mock('../../../../../services/user');

describe('routes/api/v1', () => {
  describe('get /users', () => {
    it('should return users', async () => {
      expect.assertions(3);

      const response = await supertest(app).get('/api/v1/users');

      expect(response.status).toStrictEqual(200);
      expect(response.body.users).toHaveLength(1);
      expect(response.body.users).toContainEqual({
        id: expect.any(String),
        mail: 'john.doe@gmail.com',
        name: 'John Doe',
      });
    });
  });

  describe('post /users/', () => {
    it('should create a single user', async () => {
      expect.assertions(3);

      const userAttributes = {
        mail: faker.internet.email(),
        name: faker.name.findName(),
      };

      const response = await supertest(app).post('/api/v1/users').send(userAttributes);

      expect(response.status).toStrictEqual(201);
      expect(response.body.user.mail).toStrictEqual(userAttributes.mail);
      expect(response.body.user.name).toStrictEqual(userAttributes.name);
    });

    it('should throw an error if `mail` is missing', async () => {
      expect.assertions(3);

      const userAttributes = {
        name: faker.name.findName(),
      };

      const response = await supertest(app).post('/api/v1/users').send(userAttributes);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.body.message).toMatchInlineSnapshot(
        `"\\"mail\\" is required"`,
      );
    });

    it('should throw an error if `name` is missing', async () => {
      expect.assertions(3);

      const userAttributes = {
        mail: faker.internet.email(),
      };

      const response = await supertest(app).post('/api/v1/users').send(userAttributes);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.body.message).toMatchInlineSnapshot(
        `"\\"name\\" is required"`,
      );
    });
  });

  describe('delete /users/:userId', () => {
    it('should delete a single user', async () => {
      expect.assertions(2);

      const userId = faker.datatype.uuid();
      const response = await supertest(app).delete(`/api/v1/users/${userId}`);

      expect(response.status).toStrictEqual(204);
      expect(response.body).toMatchObject({});
    });

    it('should throw an error if `userId` is not a `UUID`', async () => {
      expect.assertions(3);

      const userId = 'invalidUserId';
      const response = await supertest(app).delete(`/api/v1/users/${userId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"userId\\" must be a valid GUID"`,
      );
    });
  });

  describe('get /users/:userId', () => {
    it('should return a single user', async () => {
      expect.assertions(2);

      const userId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/users/${userId}`);

      expect(response.status).toStrictEqual(200);
      expect(response.body.user.id).toStrictEqual(userId);
    });

    it('should throw an error if `userId` is not a `UUID`', async () => {
      expect.assertions(3);

      const userId = 'invalidUserId';
      const response = await supertest(app).get(`/api/v1/users/${userId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"userId\\" must be a valid GUID"`,
      );
    });

    it('should throw an error if user is not found', async () => {
      expect.assertions(3);

      const spy = jest
        .spyOn(userService, 'getUserById')
        .mockImplementation(() => Promise.resolve(null));

      const userId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/users/${userId}`);

      expect(response.status).toStrictEqual(404);
      expect(response.body.message).toStrictEqual(`User ${userId} not found`);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('patch /users/:userId', () => {
    it('should update a single user', async () => {
      expect.assertions(3);

      const userId = faker.datatype.uuid();
      const userAttributes = {
        name: faker.name.findName(),
      };

      const response = await supertest(app).patch(`/api/v1/users/${userId}`).send(userAttributes);

      expect(response.status).toStrictEqual(200);
      expect(response.body.user.id).toStrictEqual(userId);
      expect(response.body.user.name).toStrictEqual(userAttributes.name);
    });

    it('should throw an error if `userId` is not a `UUID`', async () => {
      expect.assertions(3);

      const userId = 'invalidUserId';
      const response = await supertest(app).patch(`/api/v1/users/${userId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"userId\\" must be a valid GUID"`,
      );
    });
  });
});
