export enum MemberRole {
  FLEET_MANAGER = 'FLEET_MANAGER',
  OPS_MANAGER = 'OPS_MANAGER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
  SALES = 'SALES',
}

export interface Member {
  name: string;
  email: string;
  roles: MemberRole[];
}

export interface MembersContextType {
  members: Member[];
  addMember: (newMember: Member) => void;
  deleteMember: (id: string) => void;
  isLoading: boolean;
}

export interface MembersData {
  members: Member[];
}
