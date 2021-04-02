import { Member } from 'src/providers/members/types';

import api from './apiService';

/**
 * Axios request to get all registered users request
 * @returns { Promise<Member[]> } - Members array promise
 */
export const getMembers = async () => {
  const { data } = await api.get<Member[]>('/users');
  return data;
};

/**
 * Axios request to create a new user request
 * @param { Member } data
 * @returns { Promise<AxiosResponse<any>> }
 */
export const addMemberRequest = async (data: Member) => {
  await api.post('/users', data);
  return data;
};

/**
 * Axios request to delete a user request
 * @param {string} email
 * @returns { Promise<AxiosResponse<any>> }
 */
export const deleteMemberRequest = async (email: string) => {
  await api.delete(`/users/${email}`);
  return {
    email,
  };
};
