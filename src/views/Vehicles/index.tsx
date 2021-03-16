import React from 'react';

import { Typography } from '@material-ui/core';

import Page from 'src/components/Page';
import { VehicleProvider } from 'src/providers/vehicles';
import VehiclesTableContainer from 'src/views/Vehicles/List';

function ImportVehiclesPage() {
  return (
    <Page title="Import Vehicles">
      <Typography component="h2" gutterBottom variant="h2">
        Import Vehicles
      </Typography>
      <VehicleProvider>
        <VehiclesTableContainer />
      </VehicleProvider>
    </Page>
  );
}

export default ImportVehiclesPage;
