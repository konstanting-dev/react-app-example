import React from 'react';

import { Typography } from '@material-ui/core';

import Page from 'src/components/Page';
import { ServicesProvider } from 'src/providers/services';
import ServicesTableContainer from 'src/views/ServicePackage/Table';

function ServicePackagePage() {
  return (
    <Page title="Service Package">
      <Typography component="h2" gutterBottom variant="h2">
        Service Package
      </Typography>
      <ServicesProvider>
        <ServicesTableContainer />
      </ServicesProvider>
    </Page>
  );
}

export default ServicePackagePage;
