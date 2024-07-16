import { User } from '../types/user';
import { client } from '../utils/fetch-client';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const deleteUser = (userId: string) => {
  return client.delete(`/users/${userId}`);
};

export const createUser = (
  user: Omit<User, 'id'>
): Promise<User> => {
  return client.post('/users/', user);
};

export const updateUser = (
  user: Partial<User>,
): Promise<User> => {
  return client.patch(`/users/${user.id}`, user);
};
