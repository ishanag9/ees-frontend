import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import * as actions from "../../actions/user";
import EmployeeCard from "./EmployeeCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "sticky",
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // margin:'auto',
    width: "auto",
    textAlign: "left",
    color: "white",
    backgroundColor: "#536dfe",
    top: 67,
  },
  sticky: {
    position: "sticky",
    top: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  search: {
    position: "relative",
    // float : 'right',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    //marginRight: theme.spacing(2),
    //marginBottom: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    //   width: "auto",
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
}));

export default function ViewEmployees() {
  const classes = useStyles();

  const employees = useSelector((state) => state.reducer.employees);

  const alert = useSelector((state) => state.reducer.alert);

  const [employeeList, setEmployeeList] = React.useState([]);

  const [openSnack, setOpenSnack] = React.useState(false);

  const [filteredEmployees, setFilteredEmployees] = React.useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchEmployees());
    console.log(employees);
  }, []);

  useEffect(() => {
    if (alert) {
      setOpenSnack(true);
    }
  }, [alert]);

  useEffect(() => {
    if (employees != null) {
      setFilteredEmployees(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (filteredEmployees != null) {
      let list = filteredEmployees.map((emp, i) => {
        return (
          <Grid key={emp.empId} item xs={12} sm={6} md={4}>
            <EmployeeCard employee={emp}></EmployeeCard>
          </Grid>
        );
      });
      setEmployeeList(list);
    }
  }, [filteredEmployees, employees]);

  if (employees == null) {
    return <h1>Loading...</h1>;
  }

  // if (filteredEmployees && filteredEmployees.length===0) {
  //   return <h1>No match found...</h1>;
  // }

  const handleChange = (e) => {
    const { value } = e.target;

    console.log(value);

    // if(value==='')
    // setFilteredEmployees(employees)

    // else

    // let list = employees.filter(emp => emp.empDomain!=null)

    setFilteredEmployees(
      employees.filter(
        (emp) =>
          emp.empName.toLowerCase().match(new RegExp(`^${value}`)) ||
          emp.empEmailId.toLowerCase().match(new RegExp(`^${value}`))
      )
    );

    console.log(filteredEmployees);
  };
  const handleCloseSnack = () => {
    console.log("closing snackbar...");
    setOpenSnack(false);
  };

  return (
    <div>
      {alert && (
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={alert ? alert.type : "success"}
          >
            {alert ? alert.message : "sample"}
          </Alert>
        </Snackbar>
      )}
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={5} md={4}>
            <strong>Employees</strong>
          </Grid>

          <Grid item xs={5} sm={5} md={4}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={handleChange}
                name="searchTxt"
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>

      {/* <div className={classes.drawerHeader} /> */}
      {filteredEmployees && filteredEmployees.length === 0 ? (
        <h1>No Employee found...</h1>
      ) : (
        <Grid container spacing={3}>
          {employeeList}
        </Grid>
      )}
    </div>
  );
}
