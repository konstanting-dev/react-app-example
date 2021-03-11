import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

import overrides from './overrides';
import palette from './palette';
import typography from './typography';

const baseTheme = {
  palette,
  typography,
  overrides,
} as ThemeOptions;

export const theme = createMuiTheme(baseTheme);
