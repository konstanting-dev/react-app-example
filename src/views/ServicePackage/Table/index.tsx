import React, { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Column } from 'react-table';

import { addServiceRequest } from 'src/api/services';
import { useServicesData } from 'src/providers/services';
import { Service } from 'src/providers/services/types';
import usePopup from 'src/utils/hooks/usePopup';

import AddServiceForm from '../AddServiceForm';

import ServicesListView from './View';

function ServicesTableContainer() {
  const { handleClose, handleOpen, open } = usePopup();
  const { services, addService, isLoading } = useServicesData();
  const { isLoading: addServiceLoading, mutateAsync } = useMutation('addService', addServiceRequest);

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
    async (data: Service) => {
      await mutateAsync(data);
      addService(data);
      handleClose();
    },
    [addService, handleClose, mutateAsync],
  );

  return (
    <>
      <ServicesListView data={services} columns={columns} handleAddServiceClick={handleOpen} loading={isLoading} />
      <AddServiceForm open={open} onClose={handleClose} onSubmit={handleSubmit} loading={addServiceLoading} />
    </>
  );
}

export default ServicesTableContainer;
