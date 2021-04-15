import React, { useEffect } from "react";

import DataTable from "./DataTable";
import Grid from "@material-ui/core/Grid";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardIcon from "./Card/CardIcon";
import CardFooter from "./Card/CardFooter";
import { useDispatch, useSelector } from "react-redux";
import ErrorIcon from "@material-ui/icons/Error";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupIcon from '@material-ui/icons/Group';
import {  makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import * as actions from "../../actions/claim";
import * as userActions from "../../actions/user";
import {
  Link,
  useRouteMatch,
 
} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function MainDashboard() {
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("user"));

  let {  url } = useRouteMatch();

  const dispatch = useDispatch();

  const employees = useSelector((state) => state.reducer.employees);

  const claims = useSelector((state) => state.claimReducer.claims);

  const [pending, setPending] = React.useState(0);
  

  const [claimedAmount, setClaimedAmount] = React.useState(0);

  const [projects, setProjects] = React.useState(0);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.roles[0] === "ROLE_USER")
      dispatch(actions.fetchClaimsByEmployee(user.id));
    else dispatch(actions.fetchClaims());

    dispatch(userActions.fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (claims != null) {
      let sum = 0;

      console.log(claims);

      let list = claims.map((claim) => claim.project.title);

      list = list.filter((x, i, a) => a.indexOf(x) === i);

      // console.log(list)

      setProjects(list.length);

      list = claims.filter((claim) => claim.status.toLowerCase() === "pending");

      setPending(list.length);

      list = claims.filter(
        (claim) => claim.status.toLowerCase() === "approved"
      );

      for (var i = 0; i < list.length; i++) {
        sum += list[i].expenseAmount;
      }

      setClaimedAmount(sum);
    }
  }, [claims]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={8} sm={6} md={4} >
        {user.roles.includes("ROLE_ADMIN") ? (
          <Card >
            <CardHeader color="warning" stats icon>
              <CardIcon color="info">
                <GroupIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Employees</p>
              <h3 className={classes.cardTitle}>
                {employees ? employees.length : 0}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger>
                  <Warning />
                </Danger> */}
                <Link to={`${url}/employees`}>View details</Link>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="info">
                <ErrorIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Claims</p>
              <h3 className={classes.cardTitle}>
                {pending} <small>Pending</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger>
                <Warning />
              </Danger> */}
                <Link to={`${url}/claims`}>View details</Link>
              </div>
            </CardFooter>
          </Card>
        )}
      </Grid>

      <Grid item xs={8} sm={6} md={4}>
        <Card>
          <CardHeader color="success" stats icon>
            <CardIcon color="success">
              <AttachMoneyIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Amount</p>
            <h3 className={classes.cardTitle}>
              {claimedAmount} <small>Claimed</small>
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              {/* <Danger>
                  <Warning />
                </Danger> */}
              
                Good Going !
              
            </div>
          </CardFooter>
        </Card>
      </Grid>

      <Grid item xs={8} sm={6} md={4}>
        <Card>
          <CardHeader color="success" stats icon>
            <CardIcon color="rose">
              <AssignmentIcon />
            </CardIcon>
            <p className={classes.cardCategory}>Total</p>
            <h3 className={classes.cardTitle}>
              {projects} <small>{projects > 1 ? "Projects" : "Project"}</small>
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              {/* <Danger>
                  <Warning />
                </Danger> */}
              {/* <a href="#pablo" onClick={e => e.preventDefault()}> */}
              Keep it up!
              {/* </a> */}
            </div>
          </CardFooter>
        </Card>
      </Grid>

      {claims ? (
        <Grid item xs={12}>
          <DataTable claims={claims} />
        </Grid>
      ) : (
        <Grid item xs={12}>
        <h3>No Expense Claims</h3>
        </Grid>
      )}
    </Grid>
  );
}
