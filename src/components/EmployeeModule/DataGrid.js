import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import TodayIcon from "@material-ui/icons/Today";
import DomainIcon from "@material-ui/icons/Domain";
import SecurityIcon from "@material-ui/icons/Security";
import FaceIcon from "@material-ui/icons/Face";
import DataItem from "./DataItem";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../actions/user";
import UserImg from "./UserImg";
import ruppee from "../../images/img_ruppee.png";
import ActionBtn from "./ActionBtn";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, useRouteMatch } from "react-router-dom";
import { deepPurple } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
   // flexGrow: 1,
  },
  paper: {
    //flexGrow: 2,
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.primary,
    fontWeight: "bold",
  },
  right: {
    float: "right",
  },
  list: {
    marginBottom: 0,
  },
  icon: {
    height: 30,
    width: 30,
  },
  heading: {
    fontSize: 18,
    color: theme.palette.primary.dark,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    fontSize: "20px",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  mid: {
    margin: "auto",
  },
  centerAlign: {
    position: "absolute",
    top: "50%",
    left: "50%",
    // transform: 'translate(-50%, -50%)',
  },
  editPos: {
    top: 50,
    right: 0,
    position: "fixed",
  },
  backPos: {
    //   top:50,
    //  left:0,
    float: "left",
    //position : 'absolute',
  },
}));

export default function DataGrid(props) {
  let { path} = useRouteMatch();

  const history = useHistory();

  const user = useSelector((state) => state.reducer.user);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    //console.log('param id = ' + match.params.id)

    let loginUser = JSON.parse(localStorage.getItem("user"));
    let id = props.viewId ? props.viewId : loginUser.id;
    dispatch(actions.fetchUser(id));
  }, []);

  

  if (user == null || user.loginDetails === undefined) {
    return <CircularProgress className={classes.centerAlign} />;
  }

  const handleBack = () => {
    console.log("going back...");
    console.log(history);
    history.goBack();
  };

  // dispatch(actions.fetchUser(1))

  // const handleCloseSnack = () => {
  //   setOpenSnack(false);
  // };

  return (
    <div>
      {/* {alert && (
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
      )} */}
      <ActionBtn
        title="Go Back"
        icon={<ArrowBackIcon />}
        pos={classes.backPos}
        handleBack={handleBack}
      ></ActionBtn>
      <UserImg
        initials={user.empName.split(" ")[0][0] + user.empName.split(" ")[1][0]}
        size={classes.large}
        align={classes.mid}
        color={classes.purple}
      ></UserImg>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10} md={6} lg={4} xl={4}>
          <Paper className={classes.paper}>
            <span className={classes.heading}> Personal Details </span>{" "}
            <PersonIcon className={classes.right} />
            <List className={classes.list}>
              <DataItem
                icon={<AccountCircleIcon />}
                title="Name"
                value={user.empName}
              ></DataItem>
              <DataItem
                icon={<MailOutlineIcon />}
                title="Email"
                value={user.empEmailId}
              ></DataItem>
              <DataItem
                icon={<AssignmentIndIcon />}
                title="PAN"
                value={user.empPAN ? user.empPAN : "---"}
              ></DataItem>
              <DataItem
                icon={<TodayIcon />}
                title="DOB"
                value={user.empDOB ? user.empDOB : "---"}
              ></DataItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={4} xl={4}>
          <Paper className={classes.paper}>
            <span className={classes.heading}> Work Details </span>{" "}
            <WorkIcon className={classes.right} />
            <List className={classes.list}>
              <DataItem
                icon={<AssignmentIndIcon />}
                title="Designation"
                value={user.empDesignation ? user.empDesignation : "---"}
              ></DataItem>
              <DataItem
                icon={<DomainIcon />}
                title="Domain"
                value={user.empDomain ? user.empDomain : "---"}
              ></DataItem>
              <DataItem
                icon={<AssignmentIndIcon />}
                title="Role"
                value={user.loginDetails.role ? user.loginDetails.role : "---"}
              ></DataItem>
              <DataItem
                icon={<TodayIcon />}
                title="DOJ"
                value={user.empDOJ ? user.empDOJ : "---"}
              ></DataItem>
              <DataItem
                icon={<img className={classes.icon} alt="R" src={ruppee} />}
                title="Salary"
                value={user.empSalary ? <NumberFormat value={user.empSalary} displayType={'text'} thousandSeparator={true} prefix={'₹ '} /> : "---"}
              ></DataItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={4}>
          <Paper className={classes.paper}>
            <span className={classes.heading}> Login Details </span>{" "}
            <VpnKeyIcon className={classes.right} />
            <List className={classes.list}>
              <DataItem
                icon={<FaceIcon />}
                title="Username"
                value={user.loginDetails.userName}
              ></DataItem>
              <DataItem
                icon={<SecurityIcon />}
                title="Authorization"
                value={user.loginDetails.roles[0].name}
              ></DataItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Link to={`${path}/edit/${user.empId}`}>
        <ActionBtn
          title="Edit"
          icon={<EditIcon />}
          pos={classes.editPos}
        ></ActionBtn>
      </Link>
    </div>
  );
}
