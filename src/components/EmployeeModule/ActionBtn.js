import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root:{
        top:50,
       right:0,
        position : 'fixed',
    },
  fab: {
    margin: theme.spacing(2),
    color:'#fff',
    backgroundColor : 'green',
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function ActionBtn(props) {
  const classes = useStyles();

  const handleClick = () =>{
    console.log('clicked...')
  }

  return (
    <div className={props.pos} onClick={props.handleBack}>
      <Tooltip title={props.title} aria-label="edit">
        <Fab color="secondary" className={classes.fab}>
         {props.icon}
        </Fab>
      </Tooltip>
    </div>
  );
}
