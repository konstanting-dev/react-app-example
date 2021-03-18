import { Member, NewMember } from 'src/providers/members/types';
import { ID } from 'src/utils/string';

const MEMBERS_STORAGE_KEY = 'members';

export const getMembers = () => {
  return Promise.resolve(JSON.parse(localStorage.getItem(MEMBERS_STORAGE_KEY) || '[]') as Member[]);
};

export const addMemberRequest = (data: NewMember) => {
  const id = ID();
  const members = JSON.parse(localStorage.getItem(MEMBERS_STORAGE_KEY) || '[]') as Member[];
  const newMember = {
    id,
    ...data,
  };
  localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify([...members, newMember]));
  return Promise.resolve(newMember);
};

export const deleteMemberRequest = (id: string) => {
  const members = JSON.parse(localStorage.getItem(MEMBERS_STORAGE_KEY) || '[]') as Member[];

  return Promise.resolve(localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members.filter((m) => m.id !== id))));
};
