import prisma from '../../config/prisma';
import { createUser, deleteUserById, getUserById, updateUserById } from '../user';
import userProps from '../__fixtures__/user';

describe('user service', () => {
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      expect.assertions(1);

      const { mail, name } = userProps;

      const createdUser = await createUser({
        mail,
        name,
      });

      expect(createdUser).toMatchObject({
        id: expect.any(String),
        mail,
        name,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by id', async () => {
      expect.assertions(1);

      const { mail, name } = userProps;

      const createdUser = await createUser({
        mail,
        name,
      });
      const deletedUser = await deleteUserById(createdUser.id);

      expect(deletedUser).toBeTruthy();
    });
  });

  describe('getUserById', () => {
    it('should get a user by id', async () => {
      expect.assertions(1);

      const { mail, name } = userProps;

      const createdUser = await createUser({
        mail,
        name,
      });
      const user = await getUserById(createdUser.id);

      expect(user).toBeTruthy();
    });
  });

  describe('updateUserById', () => {
    it('should update a user by id', async () => {
      expect.assertions(1);

      const { mail, name } = userProps;

      const createdUser = await createUser({
        mail,
        name,
      });
      const updatedUser = await updateUserById(createdUser.id, {
        name: 'Jane Doe',
      });

      expect(updatedUser.name).toStrictEqual('Jane Doe');
    });
  });
});
