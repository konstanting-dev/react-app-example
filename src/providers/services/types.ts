export interface ValidityPeriod {
  from: number;
  to: number;
}

export interface Service {
  packageId: string;
  packageName: string;
  description: string;
  pricePerMinute: number;
  pricePerKm: number;
  validityPeriods: ValidityPeriod[];
  termsConditions: string;
  requiredUserClaims: string[];
  requiredBusinessClaims: string[];
}

export interface ServicesContextType {
  services: Service[];
  addService: (newService: Service) => void;
  deleteService: (packageId: string) => void;
  isLoading: boolean;
}

export interface ServicesData {
  services: Service[];
}
