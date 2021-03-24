import { MemberRole } from 'src/providers/members/types';

export interface AddMemberFormData {
  name: string;
  email: string;
  roles: MemberRole[];
}
