import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

const columns = [
  { id: "menu", label: "Menu", minWidth: 170 },
  { id: "part", label: "Part", minWidth: 100 },
  {
    id: "weight",
    label: "Weight\u00a0(lbs)",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "reps",
    label: "Reps",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "sets",
    label: "Sets",
    minWidth: 170,
    align: "right",
    format: value => value.toFixed(2)
  }
];

const useStyles = makeStyles({
  root: {
    width: "90%",
    margin: "65px auto"
  },
  tableWrapper: {
    maxHeight: 500
    // overflow: "auto"
  },
  text: {
    fontSize: "20px"
  },
  list: {
    fontSize: "15px"
  }
});

function WorkoutTable({
  openModal,
  setIsAddButton,
  setFormDataId,
  rows,
  deleteFormData
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.text}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align='right'>
                <AddIcon
                  color='primary'
                  onClick={() => {
                    openModal();
                    setIsAddButton(true);
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.list}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align='right'>
                      {/* This is edit button */}
                      <CreateIcon
                        color='secondary'
                        onClick={() => {
                          setIsAddButton(false);
                          openModal();
                          setFormDataId(row.id);
                        }}
                      />
                      <DeleteIcon
                        color='secondary'
                        onClick={() => deleteFormData(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default WorkoutTable;
