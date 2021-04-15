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
import * as actions from '../../actions/project'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CardActionArea, CardMedia } from '@material-ui/core';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const validTitleRegex = RegExp(/^[a-z A-Z]*$/);
//Validation
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

const useStyles = makeStyles((theme)=>({
    root: {
      // maxWidth: 475,
      // top: '10%',
      // left: '10%',
      // borderRadius: 10,
      // position: 'absolute',
      // transform: 'translate(-50%, -50%)',
          //  minWidth: 100,
      // backgroundColor: '#ffff',
  //     height: '350px',
  // width: '350px',
      backgroundSize: '200%',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      // transition: '0.2s',
      // backgroundImage: 'linear-gradient(45deg, #FFC312, #EE5A24, #00a8ff)',
      // backgroundImage: 'linear-gradient(45deg, #0000002F, #FFFFFFFF, #536DFE)',
      // backgroundImage: 'linear-gradient(45deg, #87e7eb, #FFFFFFFF, #F6FF33)',
      backgroundImage: 'linear-gradient(45deg, #00000000, #FFFFFFFF, #0000000A)',
      
      '&:hover': {
        backgroundPosition: 'right',
        // boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
        transform: 'scale(1.05)',
      }
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      color : '#536DFE',
      marginLeft : theme.spacing(2),
      marginTop : theme.spacing(1)
    },
    subTitle: {
      fontSize: 14,
      color : '#323232',
      // #5A6771
      marginLeft : theme.spacing(2),
      marginBottom : theme.spacing(0.5)
    },
    date: {
      fontSize: 14,
      color : '#323232',
      // color : '#65737E',
      marginLeft : theme.spacing(2),
    },
    pos: {
      marginBottom: 12,
    },
    avatar : {
        fontSize : '10px',
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    deleteBtn :{
      color : 'red',
      // color : '#ff1919',
      // marginTop : theme.spacing(-1),
      marginLeft: 'auto'
    },
    updateBtn :{
      color : 'black',
      marginRight : 'auto',
    },
    right:{
      alignContent : 'right',
    },
  }));
  

export default function ProjectCard(props) {

    const classes = useStyles();

    const [open,setOpen] = React.useState(false)

    const [open2,setOpen2] = React.useState(false)

    const proj = props.project

    const dispatch = useDispatch(); 

    const updated = useSelector((state) => state.projectReducer.updated);

    const [openSnack, setOpenSnack] = React.useState(false);
    const alert = useSelector((state) => state.projectReducer.alert);
    const added = useSelector((state) => state.projectReducer.added);

//Validation
  const [errors, setErrors] = React.useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

    // const project = useSelector(state => state.project)
    const changeDateFormatBackend=(date)=>{
      date = date.split('/')
      return (date[2]+"-"+date[0]+"-"+date[1])
  }

    const [title, setTitle] = React.useState(props.project.title);
    const [description, setDescription] = React.useState(props.project.projectDescription);
    const [startDate, setStartDate] = React.useState(changeDateFormatBackend(props.project.startDate))
    const [endDate, setEndDate] = React.useState(changeDateFormatBackend(props.project.endDate))

    useEffect(() => {
      if(alert)
      {
        setOpenSnack(true)
      }
    }, [alert]);

    useEffect(() => {
      if(updated)
      { 
        setTitle('')
        setDescription('')
        setStartDate('')
        setEndDate('')
        setOpen2(false)
      }
    }, [updated]);


    const changeDateFormat=(date)=>{
        date = date.split('-')
        return (date[1]+"/"+date[2]+"/"+date[0])
    }
   

    const handleUpdate= (e) => {
        console.log('updating ' + e)
        e.preventDefault();

        if (validateForm(errors)) {
          console.log('Updating Project: ' + e)

          if(title&&description&&startDate&&endDate)
          {
            const updateRequest = {
                id: props.project.projectCode,
                title,
                description,
                startDate : changeDateFormat(startDate),
                endDate : changeDateFormat(endDate),
            }
            dispatch(actions.editProject(updateRequest));
            console.log(updateRequest); 
          }
          else
          {
            window.alert('Fields cannot be null')
          }
        } 
        else {
          console.error("Invalid Form");
        }  
      }

  const handleFormChange = (e) => {
    //console.log(e.target);

    const { name, value } = e.target;

    let err = errors;

    if (name === 'title') {
      setTitle(value);
      err.title = validTitleRegex.test(value)
      ? value.length >= 5
        ? ""
        : "Title must be 5 characters long"
      : "No numbers allowed in title";
    } else if (name === "description") {
      setDescription(value);
      err.description =
        value.length >= 5 ? "" : "Description must be 5 character long";
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
    // setValues(vals)
    setErrors(err);

    //  console.log("values = " + JSON.stringify(values))
  }
    

      
    const handleDelete = () =>{
      console.log('deleting ' + props.project.projectCode)
      dispatch(actions.deleteProject(props.project.projectCode))
    }

    const handleReset = () =>{
      // Array.from(document.querySelectorAll("input")).forEach(
      //   input => (input.value = "")
      // );
      setTitle('')
      setDescription('')
      setStartDate('')
      setEndDate('')
  }


    const handleClose =() =>{
      setOpen(false)
    }

    const handleOpen =()=>{
      console.log(proj)
      setOpen(true)
    }

    const handleClickOpen = () => {
      console.log(proj)
      setOpen2(true);
      setTitle(props.project.title)
      setDescription(props.project.projectDescription)
      setStartDate(changeDateFormatBackend(props.project.startDate))
      setEndDate(changeDateFormatBackend(props.project.endDate))
      
    }
    const handleClickClose =() =>{
      // setTitle('')
      // setDescription('')
      // setStartDate('')
      // setEndDate('')
      setErrors({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
      })
      setOpen2(false)
    };

    const handleCloseSnack = ()=>{
      console.log("closing snackbar...")
      setOpenSnack(false)
      dispatch({type : "RESET_ALERT", payload : {}})
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

     
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open={open2} onClose={handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the details of the project here.
          </DialogContentText>
          <form id="create-course-form">
  
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            name = "title"
            value={title}
            // onChange={(e) => setTitle(e.target.value)}
            onChange = {handleFormChange}
            fullWidth
            {...(errors.title && {
              error: true,
              helperText: errors.title,
            })}
          />
           
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            name="description"
            value={description}
            // onChange={(e) => setDescription(e.target.value)}
            onChange = {handleFormChange}
            fullWidth
            {...(errors.description && {
              error: true,
              helperText: errors.description,
            })}
          />
          
          <TextField
            margin="dense"
            id="sdate"
            label="Start Date"
            type="date"
            name="startDate"
            value={startDate}
            // onChange={(e) => setStartDate(changeDateFormat(e.target.value))}
            onChange = {handleFormChange}
            // defaultValue="2017-05-24"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            min = ""
            {...(errors.startDate && {
              error: true,
              helperText: errors.startDate,
            })}
          />
          
          <TextField  
            margin="dense"
            id="edate"
            label="End Date"
            type="date"
            htmlFor = "sDate"
            name="endDate"
            value={endDate}
            // onChange={(e) => setEndDate(changeDateFormat(e.target.value))}
            onChange = {handleFormChange}
            // defaultValue="2017-05-24"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{inputProps: { min: {startDate}} }}
            fullWidth
            {...(errors.endDate && {
              error: true,
              helperText: errors.endDate,
            })}
          />
        
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          {/* <KeyboardDatePicker
          // disableToolbar
          fullWidth
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          // value={selectedDate}
          // onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        {/* </MuiPickersUtilsProvider> */}

        </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleReset} color="primary">
            Reset
          </Button>
          <Button onClick={handleClickClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} type="submit" color="primary">
          <strong>Update</strong>  
          </Button>
        </DialogActions>
        
      </Dialog>
      </MuiPickersUtilsProvider>
      
      
      {/* <CardMedia
        className={classes.media}
        image="https://picsum.photos/200"
        title="Random Project Images"
      /> */}

          
          
        <CardContent>
        { <Grid container spacing={1}>
        

          <Grid item xs={12}>
          <Typography className={classes.title}  >
           <h3><strong>{proj.title}</strong></h3>
          </Typography>
        
          
          </Grid>

          <Grid item xs={12}>
          <Typography className={classes.subTitle} display='inline'>
          <strong>Description : </strong>
           {/* <h4>{proj.projectDescription}</h4> */}
          </Typography>
          </Grid>

          <Grid item xs={12}>
          <Typography className={classes.subTitle} >
            {/* Description */}
           {proj.projectDescription}
          </Typography>
          </Grid>
          <br></br>
          <br></br>
          

          <Grid item xs={6}>
          <Typography className={classes.date}>
           <strong>Start Date:</strong> {proj.startDate}
          </Typography>
          </Grid>

          <Grid item xs={6}>
          <Typography className={classes.date}>
          <strong>End Date:</strong> {proj.endDate}
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
