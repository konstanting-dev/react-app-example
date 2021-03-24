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
export const addMemberRequest = (data: Member) => {
  return api.post('/users', data);
};

/**
 * Axios request to delete a user request
 * @param {string} email
 * @returns { Promise<AxiosResponse<any>> }
 */
export const deleteMemberRequest = (email: string) => {
  return api.delete(`/users/${email}`);
};
