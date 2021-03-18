import { NewService, Service } from 'src/providers/services/types';
import { ID } from 'src/utils/string';

const SERVICES_STORAGE_KEY = 'services';

export const getServices = () => {
  return Promise.resolve(JSON.parse(localStorage.getItem(SERVICES_STORAGE_KEY) || '[]') as Service[]);
};

export const addServiceRequest = (data: NewService) => {
  const id = ID();
  const services = JSON.parse(localStorage.getItem(SERVICES_STORAGE_KEY) || '[]') as Service[];
  const newService = {
    packageId: id,
    ...data,
  };
  localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify([...services, newService]));
  return Promise.resolve(newService);
};

export const deleteServiceRequest = (packageId: string) => {
  const services = JSON.parse(localStorage.getItem(SERVICES_STORAGE_KEY) || '[]') as Service[];

  return Promise.resolve(
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services.filter((m) => m.packageId !== packageId))),
  );
};
