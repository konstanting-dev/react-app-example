import { Member } from 'src/providers/onboarding/types';
import { ID } from 'src/utils/string';

export const getMembers = () => {
  return Promise.resolve(JSON.parse(localStorage.getItem('members') || '[]') as Member[]);
};

export const addMemberRequest = (data: Partial<Member>) => {
  const id = ID();
  const members = JSON.parse(localStorage.getItem('members') || '[]') as Member[];
  const newMember = {
    id,
    name: '',
    email: '',
    role: '',
    ...data,
  };
  localStorage.setItem('members', JSON.stringify([...members, newMember]));
  return Promise.resolve(newMember);
};

export const deleteMemberRequest = (id: string) => {
  const members = JSON.parse(localStorage.getItem('members') || '[]') as Member[];

  return Promise.resolve(localStorage.setItem('members', JSON.stringify(members.filter((m) => m.id !== id))));
};
