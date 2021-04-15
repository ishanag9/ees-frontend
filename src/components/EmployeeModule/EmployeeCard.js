import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserImg from './UserImg';
import { deepOrange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/user'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link , useRouteMatch} from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme)=>({
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
    viewBtn :{
      color : 'blue',
    },
    right:{
      alignContent : 'right',
    },
    primary:{
      fontSize : 'calc(0.65vw + 0.65vh + 0.25vmin)',
    },
  }));

export default function EmployeeCard(props) {

  let { path, url } = useRouteMatch();
    const classes = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;

    const [open,setOpen] = React.useState(false)

    const dispatch = useDispatch()

    const user = props.employee

    const handleDelete = () =>{
      console.log('deleting ' + props.employee.empId)
      dispatch(actions.deleteUser(props.employee.empId))
    }

    const handleClose =() =>{
      setOpen(false)
    }

    const handleOpen =()=>{
      setOpen(true)
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
           <strong>Cancel</strong>
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            <strong>Delete</strong>
          </Button>
        </DialogActions>
      </Dialog>
        {/* <CardContent> */}
        <Grid container spacing={1}>
          
          <Grid item xs={2}>
          <UserImg initials={user.empName.split(" ")[0][0]+user.empName.split(" ")[1][0]} color={classes.orange}></UserImg>
          </Grid>

          <Grid item xs={10}>
          <Typography className={classes.title}  >
           <strong>{user.empName}</strong>
          </Typography>
          <Typography className={classes.subTitle}  >
           {user.empDomain?user.empDomain:'Not Assigned'}
          </Typography>
          </Grid>

          <Grid item xs={12}>
          <Typography  >
            
          

           <ListItem>
          <ListItemIcon>
          <MailOutlineIcon/>
          </ListItemIcon>
          <ListItemText primary= {user.empEmailId} classes={{primary : classes.primary}} />
        </ListItem>
          </Typography>
          </Grid>

          </Grid>
           
         
          
        {/* </CardContent> */}
        <CardActions className={classes.right}>
        <Link to={`${path}/view/${props.employee.empId}`} ><IconButton aria-label="delete"  className={classes.viewBtn}>
          <VisibilityIcon />
        </IconButton>
        </Link> 
        <IconButton aria-label="delete" onClick={handleOpen} className={classes.deleteBtn}>
          <DeleteIcon />
        </IconButton>
        
        </CardActions>
      </Card>
    )
}
