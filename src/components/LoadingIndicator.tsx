import React from 'react';

import { CircularProgress, CircularProgressProps } from '@material-ui/core';

const CircularIndeterminate: React.FC<CircularProgressProps> = (props) => {
  return <CircularProgress color="secondary" {...props} />;
};

const LoadingIndicator = () => (
  <div
    style={{
      position: 'absolute',
      zIndex: 110,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(255,255,255,0.8)',
    }}
  >
    <CircularIndeterminate size={24} />
  </div>
);

export default LoadingIndicator;
