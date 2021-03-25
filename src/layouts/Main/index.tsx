import React from 'react';
import { RouteProps } from 'react-router';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { makeStyles, Theme } from '@material-ui/core/styles';

import OnboardingStepper from 'src/layouts/Main/Stepper';

import TopBar from './TopBar';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0, // IE11 fix
    },
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    maxWidth: '100%',
    overflowX: 'hidden',
    backgroundColor: '#F4F6F8',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 56,
    },
  },
}));

interface DashboardProps extends RouteProps {
  route?: RouteConfig;
}

function MainPage({ route }: DashboardProps) {
  const classes = useStyles();

  return (
    <>
      <TopBar />
      <div className={classes.container}>
        <div className={classes.content}>
          <OnboardingStepper>{route && renderRoutes(route.routes)}</OnboardingStepper>
        </div>
      </div>
    </>
  );
}

export default MainPage;
