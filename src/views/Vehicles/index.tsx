import React from 'react';

import { Typography } from '@material-ui/core';

import Page from 'src/components/Page';
import VehiclesTableContainer from 'src/views/Vehicles/List';

function ImportVehiclesPage() {
  return (
    <Page title="Import Vehicles">
      <Typography component="h2" gutterBottom variant="h2">
        Import Vehicles
      </Typography>
      <VehiclesTableContainer />
    </Page>
  );
}

export default ImportVehiclesPage;
