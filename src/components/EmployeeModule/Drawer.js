import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from './AppBar'
import DataTable from '../ClaimsModule/DataTable'
import AddClaim from '../ClaimsModule/AddClaim'
import {
  Switch,
  useRouteMatch,
  Route,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NoMatch from "./NoMatch";
import EditUser from "./EditUser";

import ViewEmployees from "./ViewEmployees";
import ViewProjects from "../ProjectModule/ViewProjects";
import ViewExpenses from "../ExpenseModule/ViewExpenses";

const useStyles = makeStyles((theme) => ({
  root: {
   // display: "flex",
  },
 
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
 
  drawertabs: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
   // flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
   
   
  },
  
  itemText: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  
  paper: {
    position: "absolute",
    width: 400,
    color: "white",
    backgroundColor: "black",
    //border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  default: {
    color: "grey",
  },
  active: {
    color: "blue",
    borderRight: "2px solid blue",
  },
}));

export default function MainDrawer() {
  
  let { path} = useRouteMatch();
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
     

      <CssBaseline />

      <AppBar/>
     
      <main
        className={classes.content}
      >
        <div className={classes.drawerHeader} />

        <Switch>
          {/* <Route path="/profile">
              <Profile></Profile>
            </Route> */}

          <AdminRoute
            component={ViewEmployees}
            path={`${path}/employees`}
            exact
          />

<AdminRoute
            component={ViewProjects}
            path={`${path}/projects`}
            exact
          />

<AdminRoute
            component={ViewExpenses}
            path={`${path}/expenses`}
            exact
          />

          <AdminRoute
            component={Profile}
            path={`${path}/employees/view/:id`}
            exact
          />

          <AdminRoute
            component={EditUser}
            path={`${path}/employees/view/:id/edit/:id`}
            exact
          />

          <PrivateRoute component={Profile} path={`${path}/profile`} exact />

          <PrivateRoute component={DataTable} path={`${path}/claims`} exact />

          <PrivateRoute component={AddClaim} path={`${path}/claims/add`} exact />

          <PrivateRoute
            component={EditUser}
            path={`${path}/profile/edit/:id`}
            exact
          />

        
          <PrivateRoute component={Dashboard} path={path} exact />

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
