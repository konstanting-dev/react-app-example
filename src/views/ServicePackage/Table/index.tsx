import React, { useCallback, useMemo } from 'react';
import { Column } from 'react-table';

import { addServiceRequest } from 'src/api/services';
import { useServicesData } from 'src/providers/services';
import { NewService, Service } from 'src/providers/services/types';
import usePopup from 'src/utils/hooks/usePopup';

import AddServiceForm from '../AddServiceForm';

import ServicesListView from './View';

function ServicesTableContainer() {
  const { handleClose, handleOpen, open } = usePopup();
  const { services, addService, isLoading } = useServicesData();

  const columns: Column<Service>[] = useMemo(
    () => [
      {
        Header: 'name',
        accessor: 'packageName',
      },
      {
        Header: 'description',
        accessor: 'description',
      },
      {
        Header: 'Price per minute',
        accessor: 'pricePerMinute',
      },
      {
        Header: 'Price per kilometer',
        accessor: 'pricePerKm',
      },
      {
        accessor: 'packageId',
      },
    ],
    [],
  );

  const handleSubmit = useCallback(
    async (data: NewService) => {
      const response = await addServiceRequest(data);
      addService({
        ...response,
      });
    },
    [addService],
  );

  return (
    <>
      <ServicesListView data={services} columns={columns} handleAddServiceClick={handleOpen} loading={isLoading} />
      <AddServiceForm open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  );
}

export default ServicesTableContainer;
