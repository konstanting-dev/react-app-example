import React, { useCallback } from 'react';
import { useTable, useSortBy, Column, usePagination } from 'react-table';

import {
  TableContainer,
  Table as MaUTable,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { deleteVehicleRequest } from 'src/api/vehicles';
import { useVehiclesData } from 'src/providers/vehicles';
import { Vehicle } from 'src/providers/vehicles/types';
import Actions from 'src/views/TeamInvitation/MembersList/Actions';
import ImportCsvButton from 'src/views/Vehicles/ImportCsvButton';

const useStyles = makeStyles((theme) => ({
  tableRoot: {
    background: '#fff',
  },
  tableNotEmpty: {
    height: 'auto',
  },
  actionBar: {
    margin: '0 -10px 20px',
  },
  addButton: {
    margin: '0 10px',
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

interface VehiclesListViewProps {
  columns: Array<Column<Vehicle>>;
  data: Vehicle[];
  handleAddVehicleClick: () => void;
  handleVehiclesParsing: (data: Vehicle[]) => void;
  loading: boolean;
}

function VehiclesListView({
  columns,
  data,
  handleAddVehicleClick,
  handleVehiclesParsing,
  loading,
}: VehiclesListViewProps) {
  const classes = useStyles();
  const { deleteVehicle } = useVehiclesData();
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
    page,
    rows,
  } = useTable<Vehicle>(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
      },
    },
    useSortBy,
    usePagination,
  );

  const onDelete = useCallback(
    async (vin: string) => {
      await deleteVehicleRequest(vin);
      deleteVehicle(vin);
    },
    [deleteVehicle],
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      gotoPage(newPage);
    },
    [gotoPage],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPageSize(+event.target.value);
      gotoPage(0);
    },
    [gotoPage, setPageSize],
  );

  return (
    <>
      <div className={classes.actionBar}>
        <Button className={classes.addButton} variant="contained" color="primary" onClick={handleAddVehicleClick}>
          Add vehicle
        </Button>
        <ImportCsvButton className={classes.addButton} onParse={handleVehiclesParsing} />
      </div>
      <TableContainer classes={{ root: classes.tableContainerRoot }}>
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
              <TableCell colSpan={9}>
                <div className={classes.emptyList}>There are no vehicles added or imported</div>
              </TableCell>
            )}
            {page.map((row, i) => {
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
                    <Actions id={row.original.vin} onDelete={onDelete} />
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}

export default VehiclesListView;
