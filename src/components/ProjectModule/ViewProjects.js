import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import * as actions from "../../actions/project";
import ProjectCard from "./ProjectCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { format } from "date-fns";

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
  addIcon : {
    marginLeft : 'auto',
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
  cancelBtn:{
    // position:absolute, 
    // top:0, 
    // right:0,
  },
}));

export default function ViewProjects(props) {

  const classes = useStyles();

  const [open2,setOpen2] = React.useState(false)

  const projects = useSelector((state) => state.projectReducer.projects);

  const added = useSelector((state) => state.projectReducer.added);

//Validation
  const [errors, setErrors] = React.useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")

  const alert = useSelector((state) => state.projectReducer.alert);

  const [projectList, setProjectList] = React.useState([]);

  const [openSnack, setOpenSnack] = React.useState(false);

  const [filteredProjects, setFilteredProjects] = React.useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchProjects());
    console.log(projects);
  }, []);

  useEffect(() => {
    if(alert)
    {
      setOpenSnack(true)
    }
  }, [alert]);

  useEffect(() => {
    if(added)
    { 
      setTitle('')
      setDescription('')
      setStartDate('')
      setEndDate('')
      setOpen2(false)
    }
  }, [added]);

  useEffect(() => {
    if (projects != null) {
      
      setFilteredProjects(projects);
    }
  }, [projects]);

  useEffect(() => {
    if (filteredProjects != null ) {
      let list = filteredProjects.map((proj, i) => {
        return (
          <Grid key={proj.projectCode} item xs={12} sm={6} md={4}>
            <ProjectCard project={proj}></ProjectCard>
          </Grid>
        );
      });
      setProjectList(list);
    }
  }, [filteredProjects,projects]);

  // if (projects == null) {
  //   return <h1>No Project Found...</h1>;
  // }

  

  const handleChange = (e) =>{

      const {value} = e.target

      console.log(value)

      // if(value==='')
      // setFilteredEmployees(employees)
      // else
      setFilteredProjects(projects.filter(proj=> proj.title.toLowerCase().match(new RegExp(`^${value}`)) ||  proj.projectDescription.toLowerCase().match(new RegExp(`\W*${value}\W*`))))                                         
                                                                                                                      
      console.log(filteredProjects)
  }

  const handleReset = () =>{ 
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      setErrors({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
      })
  }

  const handleAdd = (e) =>{
    e.preventDefault();

    if (validateForm(errors)) {
      console.log('Adding Project: ' + e)

      if(title&&description&&startDate&&endDate)
      {
        const newProject = {
          title,
          description,
          startDate,
          endDate,
        };
        dispatch(actions.addProject(newProject))
        console.log(newProject)
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
  
  const changeDateFormat=(date)=>{
    date = date.split('-')
    return (date[1]+"/"+date[2]+"/"+date[0])
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
      setStartDate(changeDateFormat(value));
    } else if (name === "endDate") {
      setEndDate(changeDateFormat(value));
    }
  
    setErrors(err);

    //  console.log("values = " + JSON.stringify(values))
  }

  const handleCloseSnack = ()=>{
    console.log("closing snackbar...")
    setOpenSnack(false)
    dispatch({type : "RESET_ALERT", payload : {}})
  }
  const handleClickOpen = () => {
    // console.log(proj)
    setOpen2(true);
    
  }
  const handleClickClose =() =>{
    setTitle('')
      setDescription('')
      setStartDate('')
      setEndDate('')
      setErrors({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
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
          <Grid item xs={4}>
            <strong>Projects</strong>
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
          <Grid className={classes.addIcon} item >
            {/* <strong>Projects</strong> */}
      
      <Button variant="contained"   onClick={handleClickOpen}  startIcon={<AddIcon />}>
        Add Project
      </Button>
     
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
      
      <Dialog open={open2} onClose={handleClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Project</DialogTitle>
        <form noValidate onSubmit={handleAdd}>
        <DialogContent>
        
          <DialogContentText>
            Input the details of the project here.
          </DialogContentText>
          
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            name = "title"
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
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        {/* </MuiPickersUtilsProvider> */}

        </DialogContent>
        <DialogActions>
        <Button onClick={handleReset} color="primary">
            Reset
          </Button>
          <Button onClick={handleClickClose} color="primary" classes={classes.cancelBtn}>
            Cancel
          </Button>
          <Button type="submit" color="primary">
          <strong>Add</strong>  
          </Button>
          
        </DialogActions>
        </form>
      </Dialog>
      
      {/* </MuiPickersUtilsProvider> */}
          </Grid>
        </Grid>
      </Paper>

      {/* <div className={classes.drawerHeader} /> */}
      { filteredProjects && filteredProjects.length===0 ? <h1>No project found...</h1>  : <Grid container spacing={3}>
        {projectList}
        
      </Grid>
      }
    </div>
  );
}
