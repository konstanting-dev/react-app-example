import api from 'src/api/apiService';
import { Vehicle } from 'src/providers/vehicles/types';

/**
 * Axios request to get the master data of all vehicles
 * @returns { Promise<Vehicle[]> } - Vehicle array promise
 */
export const getVehicles = async () => {
  const { data } = await api.get<Vehicle[]>('/vehicles');
  return data;
};

/**
 * Axios request to add a new vehicle
 * @param { Vehicle } data
 * @returns { Promise<Vehicle> }
 */
export const addVehicleRequest = async (data: Vehicle) => {
  await api.post('/vehicles', data);
  return data;
};

/**
 * Axios request to bulk import new vehicles
 * @param { Vehicle[] } data
 * @returns { Promise<Vehicle[]> }
 */
export const addVehiclesBulkRequest = async (data: Vehicle[]) => {
  await api.post('/vehicles/import', data);
  return data;
};

/**
 * Axios request to delete a vehicle
 * @param {string} vin
 * @returns { Promise<{ vin }> }
 */
export const deleteVehicleRequest = async (vin: string) => {
  await api.delete(`/vehicles/${vin}`);
  return {
    vin,
  };
};
