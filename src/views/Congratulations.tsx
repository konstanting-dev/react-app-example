import React from 'react';

import { Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Page from 'src/components/Page';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
}));

function CongratulationsPage() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page className={classes.root} title="Congratulations">
      <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
        Congratulations!
      </Typography>
    </Page>
  );
}

export default CongratulationsPage;
