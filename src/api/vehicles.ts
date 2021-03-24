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
 * @returns { Promise<AxiosResponse<any>> }
 */
export const addVehicleRequest = (data: Vehicle) => {
  return api.post('/vehicles', data);
};

/**
 * Axios request to bulk import new vehicles
 * @param { Vehicle[] } data
 * @returns { Promise<AxiosResponse<any>> }
 */
export const addVehiclesBulkRequest = (data: Vehicle[]) => {
  return api.post('/vehicles/import', data);
};

/**
 * Axios request to delete a vehicle
 * @param {string} vin
 * @returns { Promise<AxiosResponse<any>> }
 */
export const deleteVehicleRequest = (vin: string) => {
  return api.delete(`/vehicles/${vin}`);
};
