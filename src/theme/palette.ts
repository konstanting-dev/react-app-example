import { colors } from '@material-ui/core';

const white = '#FFFFFF';

export default {
  primary: {
    contrastText: white,
    dark: colors.blue[900],
    main: '#40B6D7',
    light: colors.blue[100],
  },
  secondary: {
    contrastText: white,
    dark: colors.indigo[900], // TODO: not sure that our secondary color. need to double check with designer
    main: colors.indigo.A700,
    light: colors.indigo.A400,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: '#FF1744',
    light: colors.red[400],
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: '#4CAF50',
    light: colors.green[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    disabled: '#A6B1BB',
    hint: '#546e7a',
  },
  background: {
    default: '#F4F6F8',
    paper: white,
  },
  divider: colors.grey[200],
  common: {
    black: '#263238',
    white,
  },
};
