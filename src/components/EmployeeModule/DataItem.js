import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    fontSize: "large",
  },
  item: {
    padding: 0,
  },
  primary: {
      fontSize : 12,
    color: "gray",
  },
  secondary: {
    color: "black",
    fontSize : 'calc(0.75vw + 0.75vh + 0.25vmin)',
    fontWeight : 'bold',
  },
}));

// const theme = createMuiTheme({
//     overrides: {
//       // Style sheet name ⚛️ MuiListItemText-primary
//       MuiListItem: {
//         // Name of the rule
//         text: {
//           // Some CSS
//           color: 'black',
//         },
//       },
//     },
//   });

export default function FolderList(props) {
  const classes = useStyles();

  return (
    <ListItem className={classes.item}>
      <ListItemAvatar className={classes.icon}>{props.icon}</ListItemAvatar>
      <ListItemText
        classes={{
          primary: classes.primary, // class name, e.g. `classes-nesting-root-x`
          secondary: classes.secondary, // class name, e.g. `classes-nesting-label-x`
        }}
        primary={props.title}
        secondary={props.value}
      />
    </ListItem>
  );
}
