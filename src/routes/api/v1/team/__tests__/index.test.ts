import supertest from 'supertest';
import faker from '@faker-js/faker';
import app from '../../../../../app';
import * as teamService from '../../../../../services/team';

jest.mock('../../../../../services/team');

describe('routes/api/v1', () => {
  describe('get /teams', () => {
    it('should return teams', async () => {
      expect.assertions(3);

      const response = await supertest(app).get('/api/v1/teams');

      expect(response.status).toStrictEqual(200);
      expect(response.body.teams).toHaveLength(1);
      expect(response.body.teams).toContainEqual({
        id: expect.any(String),
        name: 'Marketing',
      });
    });
  });

  describe('post /teams/', () => {
    it('should create a single team', async () => {
      expect.assertions(2);

      const teamAttributes = {
        name: faker.name.jobArea(),
      };

      const response = await supertest(app).post('/api/v1/teams').send(teamAttributes);

      expect(response.status).toStrictEqual(201);
      expect(response.body.team.name).toStrictEqual(teamAttributes.name);
    });

    it('should throw an error if `name` is missing', async () => {
      expect.assertions(3);

      const teamAttributes = {
        mail: faker.internet.email(),
      };

      const response = await supertest(app).post('/api/v1/teams').send(teamAttributes);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.body.message).toMatchInlineSnapshot(
        `"\\"name\\" is required"`,
      );
    });
  });

  describe('delete /teams/:teamId', () => {
    it('should delete a single team', async () => {
      expect.assertions(2);

      const teamId = faker.datatype.uuid();
      const response = await supertest(app).delete(`/api/v1/teams/${teamId}`);

      expect(response.status).toStrictEqual(204);
      expect(response.body).toMatchObject({});
    });

    it('should throw an error if `teamId` is not a `UUID`', async () => {
      expect.assertions(3);

      const teamId = 'invalidTeamId';
      const response = await supertest(app).delete(`/api/v1/teams/${teamId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"teamId\\" must be a valid GUID"`,
      );
    });
  });

  describe('get /teams/:teamId', () => {
    it('should return a single team', async () => {
      expect.assertions(2);

      const teamId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/teams/${teamId}`);

      expect(response.status).toStrictEqual(200);
      expect(response.body.team.id).toStrictEqual(teamId);
    });

    it('should throw an error if `teamId` is not a `UUID`', async () => {
      expect.assertions(3);

      const teamId = 'invalidteamId';
      const response = await supertest(app).get(`/api/v1/teams/${teamId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"teamId\\" must be a valid GUID"`,
      );
    });

    it('should throw an error if team is not found', async () => {
      expect.assertions(3);

      const spy = jest
        .spyOn(teamService, 'getTeamById')
        .mockImplementation(() => Promise.resolve(null));

      const teamId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/teams/${teamId}`);

      expect(response.status).toStrictEqual(404);
      expect(response.body.message).toStrictEqual(`Team ${teamId} not found`);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('patch /teams/:teamId', () => {
    it('should update a single team', async () => {
      expect.assertions(3);

      const teamId = faker.datatype.uuid();
      const teamAttributes = {
        name: faker.name.jobArea(),
      };

      const response = await supertest(app).patch(`/api/v1/teams/${teamId}`).send(teamAttributes);

      expect(response.status).toStrictEqual(200);
      expect(response.body.team.id).toStrictEqual(teamId);
      expect(response.body.team.name).toStrictEqual(teamAttributes.name);
    });

    it('should throw an error if `teamId` is not a `UUID`', async () => {
      expect.assertions(3);

      const teamId = 'invalidTeamId';
      const response = await supertest(app).patch(`/api/v1/teams/${teamId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"teamId\\" must be a valid GUID"`,
      );
    });
  });
});
