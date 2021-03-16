export enum FuelType {
  DIESEL = 'diesel',
  GASOLINE = 'gasoline',
  ETHANOL = 'ethanol',
  BIODIESEL = 'biodiesel',
  PROPANE = 'propane',
  CNG = 'cng',
  ELECTRIC = 'electric',
}

export enum Transmission {
  AUTOMATIC = 'automatic',
  MANUAL = 'Manual',
  AUTOMATED_MANUAL = 'Automated Manual',
  CONTINUOSLY_VARIABLE = 'Continuously Variable',
}

export interface Vehicle {
  vin: string;
  brand: string;
  model: string;
  color: string;
  fuelType: FuelType;
  numberOfDoors: number;
  numberOfSeats: number;
  transmission: Transmission;
  licensePlate: string;
  imageUrl?: string;
}

export interface VehiclesContextType {
  vehicles: Vehicle[];
  addVehicle: (newVehicle: Vehicle) => void;
  addVehicles: (newVehicles: Vehicle[]) => void;
  deleteVehicle: (vin: string) => void;
  isLoading: boolean;
}

export interface VehiclesData {
  vehicles: Vehicle[];
}
