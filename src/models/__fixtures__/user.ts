interface User {
  id: string;
  mail: string;
  name: string;
}

type UserCreationAttributes = Pick<User, 'mail' | 'name'>;
type UserUpdateAttributes = Pick<User, 'mail' | 'name'>;

const user: User = {
  id: '12345678-9012-3456-7890-123456789012',
  mail: 'john.doe@gmail.com',
  name: 'John Doe',
};

export default user;

export { User, UserCreationAttributes, UserUpdateAttributes };
