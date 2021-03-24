import React, { Suspense } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0, // IE11 fix
    },
  },
  content: {
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
  },
}));

interface ErrorProps {
  route?: RouteConfig;
}

function Error({ route }: ErrorProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Suspense fallback={<LinearProgress />}>{renderRoutes(route?.routes)}</Suspense>
      </div>
    </div>
  );
}

export default Error;
