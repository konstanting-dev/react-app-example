import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import ErrorEventBus from 'src/utils/eventBus';

import SnackbarContext from './context';
import { AlertColor } from './types';

interface AlertState {
  message: string;
  severity: AlertColor;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarProvider({ children }: PropsWithChildren<unknown>) {
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({
    message: '',
    severity: 'success',
  });

  const showMessage = useCallback((message: string, severity: AlertColor = 'error') => {
    if (message) {
      setAlert({
        message,
        severity,
      });

      setOpen(true);
    }
  }, []);

  const errorListener = useCallback(
    ({ detail }: CustomEvent<string>) => {
      showMessage(detail, 'error');
    },
    [showMessage],
  );

  useEffect(() => {
    ErrorEventBus.on('responseError', errorListener);
    return () => {
      ErrorEventBus.off('responseError', errorListener);
    };
  }, [errorListener, showMessage]);

  const handleClose = useCallback((event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }, []);

  return (
    <>
      <SnackbarContext.Provider value={showMessage}>{children}</SnackbarContext.Provider>
      <Snackbar
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SnackbarProvider;
