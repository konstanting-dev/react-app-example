import { Moment } from 'moment';

interface Period {
  to: Moment | null;
  from: Moment | null;
}

export interface AddServiceFormData {
  packageName: string;
  description: string;
  pricePerMinute: number;
  pricePerKm: number;
  termsConditions: string;
  validityPeriods: Period[];
  requiredUserClaims: { claim: string }[];
  requiredBusinessClaims: { claim: string }[];
}
