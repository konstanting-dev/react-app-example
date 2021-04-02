import React, { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Column } from 'react-table';

import { addServiceRequest, getServices } from 'src/api/services';
import Chips from 'src/components/Chips';
import { Service } from 'src/providers/services/types';
import usePopup from 'src/utils/hooks/usePopup';

import AddServiceForm from '../AddServiceForm';

import ServicesListView from './View';

function ServicesTableContainer() {
  const queryClient = useQueryClient();
  const { handleClose, handleOpen, open } = usePopup();
  const { isLoading, data } = useQuery('services', getServices);
  const { isLoading: addServiceLoading, mutateAsync } = useMutation('addService', addServiceRequest, {
    onSuccess: (data) => {
      queryClient.setQueryData<Service[]>(['services'], (prevServices) => [...(prevServices || []), data]);
    },
  });

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
        Header: 'User claims',
        accessor: 'requiredUserClaims',
        // eslint-disable-next-line react/display-name
        Cell: ({ value }) => {
          return <Chips values={value} />;
        },
      },
      {
        Header: 'Business claims',
        accessor: 'requiredBusinessClaims',
        // eslint-disable-next-line react/display-name
        Cell: ({ value }) => {
          return <Chips values={value} />;
        },
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
      handleClose();
    },
    [handleClose, mutateAsync],
  );

  return (
    <>
      <ServicesListView data={data || []} columns={columns} handleAddServiceClick={handleOpen} loading={isLoading} />
      <AddServiceForm open={open} onClose={handleClose} onSubmit={handleSubmit} loading={addServiceLoading} />
    </>
  );
}

export default ServicesTableContainer;
