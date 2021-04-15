import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from "@material-ui/icons/Error";
import CancelIcon from '@material-ui/icons/Cancel';
import NumberFormat from 'react-number-format';

const useChipStyles = makeStyles((theme) => ({
 success: {
    backgroundColor : 'green',
    color : 'white',
  },
  error: {
    backgroundColor : 'red',
    color : 'white',
  },
  warning : {
    backgroundColor : 'orange', 
    color : 'white',
  },
  icon : {
    color : 'white',
  }
  
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function StatusChip(props) {

  const classes = useChipStyles()

  const label = props.label.toLowerCase()

 

  return (
    <Chip
      icon={label==='approved'? <CheckCircleOutlineIcon /> : label==='pending' ?  <ErrorIcon /> :  <CancelIcon />}
      label={props.label}
      classes = {{
        icon :  classes.icon
      }}
     className={label==='approved'? classes.success : label==='pending' ? classes.warning : classes.error}
    />
  );
}

export default function DataTable(props) {
  const classes = useStyles();

  const claims = props.claims.slice(-3);

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              {user.roles.includes('ROLE_USER') ? "Expense Type" : "Employee"}&nbsp; (Last {claims.length} record)
            </StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">From</StyledTableCell>
            <StyledTableCell align="right">To</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim, i) => (
            <StyledTableRow key={claim.expenseCodeId}>
              <StyledTableCell component="th" scope="row">
                 {user.roles.includes('ROLE_USER') ? claim.expense.expenseType : claim.employee.empName}
              </StyledTableCell>
              <StyledTableCell align="right">
                <NumberFormat value={claim.expenseAmount} displayType={'text'} thousandSeparator={true} prefix={'₹ '} />
              </StyledTableCell>
              <StyledTableCell align="right">
                
                <StatusChip label={claim.status}/>
                
              </StyledTableCell>
              <StyledTableCell align="right">{claim.startDate}</StyledTableCell>
              <StyledTableCell align="right">{claim.endDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
