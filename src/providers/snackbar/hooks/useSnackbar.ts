import { useContext } from 'react';

import SnackbarContext from '../context';
import { SnackbarContextType } from '../types';

export default (): SnackbarContextType => {
  return useContext(SnackbarContext);
};
