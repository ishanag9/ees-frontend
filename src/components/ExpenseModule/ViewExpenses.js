import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import * as actions from "../../actions/expense";
import ExpenseCard from "./ExpenseCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

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
    top: 66,
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
     position: 'relative',
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
  addIcon : {
    marginLeft : 'auto',
  },
}));

const validTypeRegex = RegExp(/^[a-z A-Z]*$/);
//Validation
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export default function ViewExpenses(props) {
  const classes = useStyles();

  const expenses = useSelector((state) => state.expenseReducer.expenses);

  //

  const added = useSelector((state) => state.expenseReducer.added);

  //
  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");

  const alert = useSelector((state) => state.expenseReducer.alert);

  const [expenseList, setExpenseList] = React.useState([]);

  const [openSnack, setOpenSnack] = React.useState(false);

  const [filteredExpenses, setFilteredExpenses] = React.useState([]);

  const dispatch = useDispatch();

  const [open2,setOpen2] = React.useState(false)


  //Validation
  const [errors, setErrors] = React.useState({
    type: "",
    description: "",
    
  });

  useEffect(() => {
    dispatch(actions.fetchExpenses());
    console.log(expenses);
  }, []);

  useEffect(() => {
    if(alert)
    {
      setOpenSnack(true)
    }
  }, [alert]);

  useEffect(() => {
    if (expenses != null) {
      
      setFilteredExpenses(expenses);
    }
  }, [expenses]);

  //
  useEffect(() => {
    if(added)
    { 
      setType('')
      setDescription('')
      setOpen2(false)
    }
  }, [added]);

  useEffect(() => {
    if (filteredExpenses != null && filteredExpenses.length>0) {
      let list = filteredExpenses.map((exp, i) => {
        return (
          <Grid key={exp.expenseCode} item xs={12} sm={6} md={3}>
            <ExpenseCard expense={exp}></ExpenseCard>
          </Grid>
        );
      });
      setExpenseList(list);
    }
  }, [filteredExpenses,expenses]);

  // if (expenses == null) {
  //   return <h1>No Expense Found...</h1>;
  // }

  const handleChange = (e) =>{

      const {value} = e.target

      console.log(value)

     
      setFilteredExpenses(expenses.filter(exp=> exp.expenseType.toLowerCase().match(new RegExp(`^${value}`)) ||  exp.expenseDescription.toLowerCase().match(new RegExp(`\W*${value}\W*`))))

      console.log(filteredExpenses)
  }


  //
  const handleAdd = (e) =>{
    e.preventDefault();

    if (validateForm(errors)) {
      console.log('Adding Expense: ' + e)

      if(type && description)
      {
        const newExpense = {
          expenseType:type,
          expenseDescription:description,
        };
        dispatch(actions.addExpense(newExpense))
        console.log(newExpense)
        // setOpen2(false) 
      }
      else
      {
        window.alert('Fields cannot be null')
      }
    } 
      else {
        console.error("Invalid Form");
      }  
    
    // setOpen2(false)     //This is a call to close dialog box
    
  }
  //
  const handleFormChange = (e) => {
    //console.log(e.target);

    const { name, value } = e.target;

    let err = errors;
    // setTitle(value);
    if (name === 'type') {
      setType(value);

      // err.title = validTitleRegex.test(value)
      //   ? ""
      //   : "No numbers allowed in title";
      // err.title =
      //   value.length >= 5 ? "" : "Title must be minimum 5 character long";
      // err.title = validTitleRegex.test(value)
      //   ? ""
      //   : "No numbers allowed in title";
        err.type = validTypeRegex.test(value)
          ? value.length >= 5
            ? ""
            : "Type must be 5 characters long"
          : "No numbers allowed";
    } else if (name === "description") {
      setDescription(value);
      err.description =
        value.length >= 5 ? "" : "Description must be minimum 5 character long";
    } 
    // setValues(vals)
    setErrors(err);

    //  console.log("values = " + JSON.stringify(values))
  }

  //


  const handleCloseSnack = ()=>{
    console.log("closing snackbar...")
    setOpenSnack(false)
    dispatch({type : "RESET_ALERT", payload : {}})
  }
  
  //ADD ACTION -    OLD CODE
  // const handleAdd = (e) =>{
  //   console.log('ADDING: ' + e)
  //   e.preventDefault();
  // const newExpense = {
  //   expenseType,
  //   expenseDescription,
  // };
  // dispatch(actions.addExpense(newExpense))
  // console.log(newExpense)
  // setOpen2(false)
  // }

  //
  const handleClickOpen = () => {
    // console.log(proj)
    setOpen2(true);
    
  }

  //
  const handleClickClose =() =>{
    setType('')
      setDescription('')
      setErrors({
        type: "",
        description: "",
      })
    setOpen2(false)
  };

  return (
    <div>
      {alert && <Snackbar
              open={openSnack}
              autoHideDuration={6000}
              onClose={handleCloseSnack}
            >
              <Alert onClose={handleCloseSnack} severity={alert?alert.type:'success'}>
                {alert ? alert.message : 'sample'}
              </Alert>
            </Snackbar>}
       <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={4} >
            <strong>Expenses</strong>
          </Grid>

          <Grid item xs={4}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
              onChange={handleChange}
              name='searchTxt'
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>

{/*  */}
<Grid className={classes.addIcon} item >
            {/* <strong>Projects</strong> */}
      
      <Button variant="contained"   onClick={handleClickOpen}  startIcon={<AddIcon />}>
        Add Expense
      </Button>
      
      <Dialog open={open2} onClose={handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input the details of the Expense here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="type"
            name = 'type'
            label="Type"
            type="text"
            //onChange={(e) => setexpenseType(e.target.value)}
            onChange = {handleFormChange}
            fullWidth
            {...(errors.type && {
              error: true,
              helperText: errors.type,
            })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            name='description'
            //onChange={(e) => setexpenseDescription(e.target.value)}
            onChange = {handleFormChange}
            fullWidth
            {...(errors.description && {
              error: true,
              helperText: errors.description,
            })}
          />
          

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
          <strong>Add</strong>  
          </Button>
        </DialogActions>
        
      </Dialog>
      
          </Grid>

        </Grid>
      </Paper> 

       {/* <div className={classes.drawerHeader} />  */}
       { filteredExpenses && filteredExpenses.length===0 ? <h1>No Expense found...</h1>  : <Grid container spacing={3}>
        {expenseList}
       
        
      </Grid>}
    </div>
  );
}
