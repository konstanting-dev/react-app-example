export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type NewMember = Omit<Member, 'id'>;

export interface MembersContextType {
  members: Member[];
  addMember: (newMember: Member) => void;
  deleteMember: (id: string) => void;
  isLoading: boolean;
}

export interface MembersData {
  members: Member[];
}
