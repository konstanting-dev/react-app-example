import React, { Suspense } from 'react';
import { RouteProps } from 'react-router';
import { RouteConfig } from 'react-router-config';

import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, Theme } from '@material-ui/core/styles';

import OnboardingStepper from 'src/layouts/Main/Stepper';
import OnboardingProvider from 'src/providers/onboarding/provider';

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

export function MainProvider(props: DashboardProps) {
  return (
    <OnboardingProvider>
      <MainPage {...props} />
    </OnboardingProvider>
  );
}

function MainPage(props: DashboardProps) {
  const classes = useStyles();

  return (
    <>
      <TopBar />
      <div className={classes.container}>
        <div className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            <OnboardingStepper {...props} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default MainProvider;
