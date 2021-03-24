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
import { useMembersData } from 'src/providers/members';
import { Member } from 'src/providers/members/types';

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

interface MembersListViewProps {
  columns: Array<Column<Member>>;
  data: Member[];
  handleAddMemberClick: () => void;
  loading: boolean;
}

function MembersListView({ columns, data, handleAddMemberClick, loading }: MembersListViewProps) {
  const classes = useStyles();
  const { deleteMember } = useMembersData();
  const { getTableProps, headerGroups, prepareRow, rows } = useTable<Member>(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['id'],
      },
    },
    useSortBy,
  );

  return (
    <TableContainer classes={{ root: classes.tableContainerRoot }}>
      {loading && <LoadingIndicator />}
      <div className={classes.actionBar}>
        <Button variant="contained" color="primary" onClick={handleAddMemberClick}>
          Add member
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
            <TableRow className={classes.row}>
              <TableCell colSpan={3}>
                <div className={classes.emptyList}>There are no members invited</div>
              </TableCell>
            </TableRow>
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
                  <Actions id={row.original.email} onDelete={deleteMember} />
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
}

export default MembersListView;
