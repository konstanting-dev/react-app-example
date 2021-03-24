import * as React from 'react';
import { PropsWithChildren } from 'react';

import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

export const styles = makeStyles(() => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `pending={true}`. */
  pending: {},
  /* Styles applied to the pendingIndicator element. */
  pendingIndicator: {
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="center"`. */
  pendingIndicatorCenter: {
    left: '50%',
    transform: 'translate(-50%)',
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="start"`. */
  pendingIndicatorStart: {
    left: 14,
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="end"`. */
  pendingIndicatorEnd: {
    right: 14,
  },
  /* Styles applied to the endIcon element if `pending={true}` and `pendingPosition="end"`. */
  endIconPendingEnd: {
    visibility: 'hidden',
  },
  /* Styles applied to the startIcon element if `pending={true}` and `pendingPosition="start"`. */
  startIconPendingStart: {
    visibility: 'hidden',
  },
  /* Styles applied to the label element if `pending={true}` and `pendingPosition="center"`. */
  labelPendingCenter: {
    visibility: 'hidden',
  },
}));

const PendingIndicator = <CircularProgress color="inherit" size={16} />;

type LoadingButtonProps = ButtonProps &
  PropsWithChildren<unknown> & {
    disabled?: boolean;
    pending?: boolean;
    pendingIndicator?: React.ReactNode;
  };

const LoadingButton = (props: LoadingButtonProps) => {
  const classes = styles();
  const {
    children,
    className,
    disabled = false,
    pending = false,
    pendingIndicator = PendingIndicator,
    ...other
  } = props;

  return (
    <Button
      classes={{ label: pending ? classes.labelPendingCenter : '' }}
      className={clsx(classes.root, className)}
      disabled={disabled || pending}
      {...other}
    >
      {pending && (
        <div className={clsx(classes.pendingIndicator, classes.pendingIndicatorCenter)}>{pendingIndicator}</div>
      )}

      {children}
    </Button>
  );
};

export default LoadingButton;
