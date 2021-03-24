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
 * @returns { Promise<AxiosResponse<any>> }
 */
export const addServiceRequest = (data: Service) => {
  return api.post('/service-packages', data);
};

/**
 * Axios request to delete a service package
 * @param {string} packageId
 * @returns { Promise<AxiosResponse<any>> }
 */
export const deleteServiceRequest = (packageId: string) => {
  return api.delete(`/service-packages/${packageId}`);
};
