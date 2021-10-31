import supertest from 'supertest';
import app from '../../../app';

describe('*', () => {
  it('should throw `404 Error if no route is being matched', async () => {
    expect.assertions(1);

    const request = await supertest(app).get('/not-found');

    expect(request.status).toBe(404);
  });
});
