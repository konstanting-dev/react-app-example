import React from 'react';

import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ChipsProps {
  values: string[];
}

const useStyles = makeStyles(() => ({
  root: {
    width: 210,
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -5px',
  },
  item: {
    flexGrow: 0,
    margin: '0 5px 5px',
  },
}));

function Chips({ values }: ChipsProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {values?.map((value) => (
        <Chip className={classes.item} key={value} label={value} />
      ))}
    </div>
  );
}

export default Chips;
