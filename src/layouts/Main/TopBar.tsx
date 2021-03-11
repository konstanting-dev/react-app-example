import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, AppBarProps, Toolbar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none',
  },
  appBar: {
    backgroundColor: theme.palette.common.black,
  },
  flexGrow: {
    flexGrow: 1,
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    color: '#ffffff',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 1),
    display: 'flex',
    alignItems: 'center',
    '& fieldset': {
      border: 0,
    },
    '& .MuiInputBase-root': {
      color: 'inherit',
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  oldDashboardButton: {
    marginLeft: theme.spacing(1),
  },
  oldDashboardIcon: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
  logoutButton: {
    marginLeft: theme.spacing(1),
  },
  logoutIcon: {
    marginRight: theme.spacing(1),
  },
}));

interface TopBarProps extends AppBarProps {
  className?: string;
}

function TopBar({ className, ...rest }: TopBarProps) {
  const classes = useStyles();
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      classes={{
        colorPrimary: classes.appBar,
      }}
      color="primary"
    >
      <Toolbar>
        <RouterLink to="/">
          <img width={143} height={36} alt="Logo" src="/static/img/logo.png" />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
