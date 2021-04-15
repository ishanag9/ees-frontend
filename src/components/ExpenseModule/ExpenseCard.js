import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/expense'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'; 
import TextField from '@material-ui/core/TextField'; 
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { CenterFocusStrong } from '@material-ui/icons';
import {useSelector } from "react-redux";
import { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";





const useStyles = makeStyles((theme)=>({
  // 
  root: {
    // minWidth: 275,
    //backgroundColor: '#90caf9',
    color : 'black',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    
    

    "&:hover": {
     boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
       transform: 'scale(1.05)',
   },
   },
   bullet: {
     display: 'inline-block',
     margin: '0 2px',
     transform: 'scale(0.8)',
   },
   title: {
     fontSize: 14,
     marginLeft : theme.spacing(2),
     marginTop : theme.spacing(1)
   },
   subTitle: {
     fontSize: 14,
     marginLeft : theme.spacing(2),
   },
   avatar : {
       fontSize : '10px',
   },
   orange: {
     color: theme.palette.getContrastText(deepOrange[500]),
     backgroundColor: deepOrange[500],
   },

    deleteBtn :{
      color : 'red',
    },
    right:{
      alignContent : 'center',
    },
  }));


  const validTypeRegex = RegExp(/^[a-z A-Z]*$/);
//Validation
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export default function ExpenseCard(props) {

    const classes = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;

    //const [expenseCode, setexpenseCode] = React.useState("");
    const [type, setType] = React.useState(props.expense.expenseType);
  const [description, setDescription] = React.useState(props.expense.expenseDescription);

    const [open,setOpen] = React.useState(false)

    const dispatch = useDispatch()

    const [open2,setOpen2] = React.useState(false)
    const updated = useSelector((state) => state.expenseReducer.updated);

//
    const [openSnack, setOpenSnack] = React.useState(false);
    const alert = useSelector((state) => state.expenseReducer.alert);
    const added = useSelector((state) => state.expenseReducer.added);

    const exp = props.expense

    //Validation
  const [errors, setErrors] = React.useState({
    type: "",
    description: "",
  });

  useEffect(() => {
    if(alert)
    {
      setOpenSnack(true)
    }
  }, [alert]);

  useEffect(() => {
    if(updated)
    { 
      setType('')
      setDescription('')
      setOpen2(false)
    }
  }, [updated]);

    const handleDelete = () =>{
      console.log('deleting ' + props.expense.expenseCode)
      dispatch(actions.deleteExpense(props.expense.expenseCode))
    }

    const handleClose =() =>{
      setOpen(false)
    }

    const handleOpen =()=>{
      console.log(exp)
      setOpen(true)
    }

    const handleClickOpen = () => {
      console.log(exp)
      setOpen2(true);
      setType(props.expense.expenseType)
      setDescription(props.expense.expenseDescription)
    }

    const handleClickClose =() =>{
      setErrors({
        type: "",
        description: "",
      })
      setOpen2(false)
    };

    const handleCloseSnack = ()=>{
      console.log("closing snackbar...")
      setOpenSnack(false)
      dispatch({type : "RESET_ALERT", payload : {}})
    }


    //
    const handleUpdate= (e) => {
      console.log('updating ' + e)
      e.preventDefault();

      if (validateForm(errors)) {
        console.log('Updating Expense: ' + e)

        if(type&&description)
        {
          const updateRequest = {
              expenseCode: props.expense.expenseCode,
              expenseType:type,
              expenseDescription:description,
          }
          dispatch(actions.editExpense(updateRequest));
          console.log(updateRequest); 
          // setOpen2(false)     //This is a call to close dialog box
          // dispatch(actions.fetchProjects());
        }
        else
        {
          window.alert('Fields cannot be null')
        }
      } 
      else {
        window.alert("Invalid Form");
      }  
    }
    //
    const handleFormChange = (e) => {
      //console.log(e.target);
  
      const { name, value } = e.target;
  
      let err = errors;
      // setTitle(value);
      if (name === 'type') {
        setType(value);
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

    return (
      <Card className={classes.root}>
        <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action is irreversible!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
         Cancel
        </Button>
        <Button onClick={handleDelete} color="primary" autoFocus>
          <strong>Delete</strong>
        </Button>
      </DialogActions>
    </Dialog>

  
    <Dialog open={open2} onClose={handleClickClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update Expense</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update the details of the Expense here.
        </DialogContentText>
      
        <TextField
          autoFocus
          margin="dense"
          id="type"
          label="Type"
          type="text"
          name='type'
          multiline
          variant="outlined"
          //onChange={(e) => setexpenseType(e.target.value)}
          defaultValue = {props.expense.expenseType}
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
          variant="outlined"
          multiline
          type="text"
          name='description'
          //onChange={(e) => setexpenseDescription(e.target.value)}
          defaultValue ={props.expense.expenseDescription}
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
        <Button onClick={handleUpdate} color="primary">
        <strong>Update</strong>  
        </Button>
      </DialogActions>
      
    </Dialog>
            
      <CardContent>
      { <Grid container spacing={3}>
        
       

        <Grid item xs={12}>
        <Typography className={classes.title}  >
         <h3><strong>{exp.expenseType}</strong></h3>
        </Typography>
       
        
        </Grid>

          <Grid item xs={12}>
        <Typography className={classes.subTitle} display='inline'>
          
         Description : 
         </Typography> 
         </Grid>  

        <Grid item xs={12}>
        <Typography className={classes.subTitle} >
          {/* Description */}
         {exp.expenseDescription}
        </Typography>
        </Grid>

        

        </Grid> 
      } 
  
        
      </CardContent>
    
      <CardActions className={classes.right}>
      <IconButton aria-label="delete" onClick={handleOpen} className={classes.deleteBtn}>
        <DeleteIcon />
      </IconButton>

      <IconButton aria-label="update" onClick={handleClickOpen} className={classes.updateBtn}>
        <EditIcon />
      </IconButton>
      </CardActions>
    </Card>
  )
}