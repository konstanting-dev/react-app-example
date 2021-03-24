import { Moment } from 'moment';

interface Period {
  to: Moment | null;
  from: Moment | null;
}

export interface AddServiceFormData {
  packageId: string;
  packageName: string;
  description: string;
  pricePerMinute: number;
  pricePerKm: number;
  termsConditions: string;
  validityPeriods: Period[];
  requiredUserClaims: string[];
  requiredBusinessClaims: string[];
}
