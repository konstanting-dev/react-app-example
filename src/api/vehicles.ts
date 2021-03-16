import { Vehicle } from 'src/providers/vehicles/types';

const VEHICLES_STORAGE_KEY = 'vehicles';

export const getVehicles = () => {
  return Promise.resolve(JSON.parse(localStorage.getItem(VEHICLES_STORAGE_KEY) || '[]') as Vehicle[]);
};

export const addVehicleRequest = (data: Vehicle) => {
  const vehicles = JSON.parse(localStorage.getItem(VEHICLES_STORAGE_KEY) || '[]') as Vehicle[];
  localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify([...vehicles, data]));
  return Promise.resolve(data);
};

export const addVehiclesBulkRequest = (data: Vehicle[]) => {
  const vehicles = JSON.parse(localStorage.getItem(VEHICLES_STORAGE_KEY) || '[]') as Vehicle[];
  localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify([...vehicles, ...data]));
  return Promise.resolve(data);
};

export const deleteVehicleRequest = (vin: string) => {
  const vehicles = JSON.parse(localStorage.getItem(VEHICLES_STORAGE_KEY) || '[]') as Vehicle[];

  return Promise.resolve(
    localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(vehicles.filter((m) => m.vin !== vin))),
  );
};
