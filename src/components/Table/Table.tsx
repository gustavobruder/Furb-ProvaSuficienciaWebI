import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { headCells, TableData } from './Table.data';
import ModalUpdate from '../ModalUpdate/ModalUpdate';
import './Table.css';

const EmployeeTableToolbar = () => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Employee List
      </Typography>
    </Toolbar>
  );
};

const EmployeeTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell
            key="table-head-action"
            align="left"
          >
            Action
          </TableCell>
      </TableRow>
    </TableHead>
  );
};

interface EmpoyeeTableRowsProps {
  row: TableData;
  handleClickUpdate: (id: number, name: string, salary: number, age: number) => void;
}

const EmpoyeeTableRow = (props: EmpoyeeTableRowsProps) => {
  const { row, handleClickUpdate } = props;

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.id}
    >
      <TableCell
        component="th"
        id={`enhanced-table-checkbox-${row.id}`}
        scope="row"
      >
        {row.id}
      </TableCell>
      <TableCell align="left">{row.employeeName}</TableCell>
      <TableCell align="left">{row.employeeSalary}</TableCell>
      <TableCell align="left">{row.employeeAge}</TableCell>
      <TableCell align="left">
        <IconButton
          onClick={() => handleClickUpdate(row.id, row.employeeName, row.employeeSalary, row.employeeAge)}
          color="warning"
          aria-label="update employee">
          <BorderColorIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

interface EmployeeUpdate {
  id: number;
  name: string;
  salary: number;
  age: number;
}

interface EmployeeTableProps {
  rows: TableData[];
  onRefetch: () => void;
}

const EmployeeTable = (props: EmployeeTableProps) => {
  const { rows, onRefetch } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [employeeUpdate, setEmployeeUpdate] = useState<EmployeeUpdate | undefined>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const modalUpdateEmployee =
    employeeUpdate == null ? (
      <></>
    ) : (
      <ModalUpdate
        handleClose={() => setEmployeeUpdate(undefined)}
        modalOpen={employeeUpdate != null}
        employeeId={employeeUpdate.id}
        employeeName={employeeUpdate.name}
        employeeSalary={employeeUpdate.salary}
        employeeAge={employeeUpdate.age}
        onRefetch={onRefetch}
      />
    );

  return (
    <Paper variant="outlined" className="employee-table-paper">
      {modalUpdateEmployee}
      <EmployeeTableToolbar/>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size='medium'
        >
          <EmployeeTableHead/>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <EmpoyeeTableRow
                    row={row}
                    handleClickUpdate={(id, name, salary, age) => setEmployeeUpdate({
                      id, name, salary, age,
                    })}
                  />
                );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EmployeeTable;