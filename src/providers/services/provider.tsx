import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getServices } from 'src/api/services';

import ServicesContext from './context';
import { Service, ServicesData } from './types';

export function ServicesProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoading, data } = useQuery('services', getServices);
  const [servicesData, setServicesData] = useState<ServicesData>({
    services: [],
  });

  useEffect(() => {
    setServicesData((prev) => ({
      ...prev,
      services: data || [],
    }));
  }, [data]);

  const handleAddService = useCallback((newService: Service) => {
    setServicesData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  }, []);

  const handleDeleteService = useCallback(async (packageId: string) => {
    setServicesData((prev) => {
      return {
        ...prev,
        services: prev.services.filter((m) => m.packageId !== packageId),
      };
    });
  }, []);

  const defaultContext = {
    services: servicesData.services,
    addService: handleAddService,
    deleteService: handleDeleteService,
    isLoading,
  };

  return <ServicesContext.Provider value={defaultContext}>{children}</ServicesContext.Provider>;
}

export default ServicesProvider;
