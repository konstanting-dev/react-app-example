import palette from '../palette';
import typography from '../typography';

export default {
  root: {
    ...typography.body1,
    borderBottom: `1px solid ${palette.divider}`,
    padding: 8,
  },
  head: {
    fontWeight: 600,
    textTransform: 'uppercase',
  },
};
