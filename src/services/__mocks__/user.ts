import user, { User } from '../../models/__fixtures__/user';

function deleteUserById(): Promise<number> {
  return Promise.resolve(1);
}

function getUsers(): Promise<User[]> {
  return Promise.resolve([user]);
}

function getUserById(): Promise<User> {
  return Promise.resolve(user);
}

function updateUserById(): Promise<User> {
  return Promise.resolve(user);
}

export { deleteUserById, getUsers, getUserById, updateUserById };
