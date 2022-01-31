import user, {
  User,
  UserCreationAttributes,
  UserUpdateAttributes,
} from '../../models/__fixtures__/user';

function createUser(attributes: UserCreationAttributes): Promise<User> {
  return Promise.resolve({
    ...user,
    ...attributes,
  });
}

function deleteUserById(): Promise<number> {
  return Promise.resolve(1);
}

function getUsers(): Promise<User[]> {
  return Promise.resolve([user]);
}

function getUserById(userId: string): Promise<User> {
  return Promise.resolve({
    ...user,
    id: userId,
  });
}

function getUsersByOrganizationId(): Promise<User[]> {
  return Promise.resolve([user]);
}

function getUsersByTeamId(): Promise<User[]> {
  return Promise.resolve([user]);
}

function updateUserById(userId: string, attributes: UserUpdateAttributes): Promise<User> {
  return Promise.resolve({
    ...user,
    id: userId,
    ...attributes,
  });
}

export {
  createUser,
  deleteUserById,
  getUsers,
  getUserById,
  getUsersByOrganizationId,
  getUsersByTeamId,
  updateUserById,
};
