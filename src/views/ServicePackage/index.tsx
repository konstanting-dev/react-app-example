import React from 'react';

import { Typography } from '@material-ui/core';

import Page from 'src/components/Page';
import ServicesTableContainer from 'src/views/ServicePackage/Table';

function ServicePackagePage() {
  return (
    <Page title="Service Package">
      <Typography component="h2" gutterBottom variant="h2">
        Service Package
      </Typography>
      <ServicesTableContainer />
    </Page>
  );
}

export default ServicePackagePage;
