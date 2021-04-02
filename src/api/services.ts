import api from 'src/api/apiService';
import { Service } from 'src/providers/services/types';

/**
 * Axios request to get the list of all service packages
 * @returns { Promise<Service[]> } - Service array promise
 */
export const getServices = async () => {
  const { data } = await api.get<Service[]>('/service-packages');
  return data;
};

/**
 * Axios request to add a new service package
 * @param { Service } data
 * @returns { Promise<Service> }
 */
export const addServiceRequest = async (data: Service) => {
  await api.post('/service-packages', data);
  return data;
};

/**
 * Axios request to delete a service package
 * @param {string} packageId
 * @returns { Promise<{ packageId }> }
 */
export const deleteServiceRequest = async (packageId: string) => {
  await api.delete(`/service-packages/${packageId}`);
  return {
    packageId,
  };
};
