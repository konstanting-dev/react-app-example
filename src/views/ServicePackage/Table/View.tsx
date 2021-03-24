import React from 'react';
import { useTable, useSortBy, Column } from 'react-table';

import {
  TableContainer,
  Table as MaUTable,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import LoadingIndicator from 'src/components/LoadingIndicator';
import { useServicesData } from 'src/providers/services';
import { Service } from 'src/providers/services/types';

import Actions from './Actions';

const useStyles = makeStyles(() => ({
  tableRoot: {
    background: '#fff',
  },
  tableNotEmpty: {
    height: 'auto',
  },
  actionBar: {
    marginBottom: 20,
  },
  tableContainerRoot: {
    position: 'relative',
    padding: '20px 0',
  },
  emptyList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFooter: {
    color: 'inherit',
  },
  row: {
    height: 45,
  },
}));

interface ServicesListViewProps {
  columns: Array<Column<Service>>;
  data: Service[];
  handleAddServiceClick: () => void;
  loading: boolean;
}

function ServicesListView({ columns, data, handleAddServiceClick, loading }: ServicesListViewProps) {
  const classes = useStyles();
  const { deleteService } = useServicesData();
  const { getTableProps, headerGroups, prepareRow, rows } = useTable<Service>(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['packageId'],
      },
    },
    useSortBy,
  );

  return (
    <TableContainer classes={{ root: classes.tableContainerRoot }}>
      {loading && <LoadingIndicator />}
      <div className={classes.actionBar}>
        <Button variant="contained" color="primary" onClick={handleAddServiceClick}>
          Add service
        </Button>
      </div>
      <MaUTable className={clsx(classes.tableRoot, { [classes.tableNotEmpty]: rows.length })} {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, index) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps({ title: undefined })))}
                  key={index}
                  colSpan={index === headerGroup.headers.length - 1 ? 2 : 1}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {!rows.length && (
            <TableCell colSpan={4}>
              <div className={classes.emptyList}>There are no services added</div>
            </TableCell>
          )}
          {rows.map((row, i) => {
            prepareRow(row);

            return (
              <React.Fragment key={i}>
                <TableRow className={classes.row} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <TableCell {...cell.getCellProps()} key={index}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                  <Actions id={row.original.packageId} onDelete={deleteService} />
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
}

export default ServicesListView;
