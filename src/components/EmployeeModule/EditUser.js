import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../../actions/user";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import NumberFormat from "react-number-format";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validNameRegex = RegExp(/^[A-Z][a-z]{3,}$/);

const validPanRegex = RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);

const validDetailRegex = RegExp(/^[a-z A-Z]*$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₹ "
    />
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  cancel: {
    margin: theme.spacing(3, 4, 2, 4),
  },
  update: {
    margin: theme.spacing(3, 0, 2, 1),
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function EditUser({ match }) {
  const classes = useStyles();

  const user = useSelector((state) => state.reducer.user);

  const alert = useSelector((state) => state.reducer.alert);

  const loginUser = JSON.parse(localStorage.getItem("user"));

  const updated = useSelector((state) => state.reducer.updated);

  // const [values,setValues] = React.useState({
  //   firstName : '',
  //   lastName : '',
  //   email : '',
  //   pan : '',
  //   dob : null,
  //   domain : null,
  //   doj : null

  // })

  const [errors, setErrors] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    pan: "",
    designation: "",
    domain: "",
    role: "",
    salary: "",
    dob: "",
    doj: "",
  });

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pan, setPan] = React.useState(null);
  const [doj, setDoj] = React.useState(null);
  const [dob, setDob] = React.useState(null);
  const [domain, setDomain] = React.useState(null);
  const [designation, setDesignation] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [salary, setSalary] = React.useState(null);

  const [openSnack, setOpenSnack] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    let loginUser = JSON.parse(localStorage.getItem("user"));

    let id = match.params.id;

    console.log(loginUser);
    console.log("id" + id);

    // console.log(loginUser.id === id)

    if (loginUser.roles[0] === "ROLE_ADMIN" || loginUser.id === parseInt(id))
      dispatch(actions.fetchUser(id));
  }, []);

  useEffect(() => {
    if (updated) {
      console.log(history);
      history.goBack();
    }
  }, [updated, history]);

  useEffect(() => {
    if (alert && alert.type === "error") {
      setOpen(false);
      setOpenSnack(true);
    }
  }, [alert]);

  useEffect(() => {
    // console.log("inside user effect....");

    if (user != null) {
      console.log("setting PAN to " + user.empPAN);

      setPan(user.empPAN);
      setFirstName(user.empName.split(" ")[0]);
      setLastName(user.empName.split(" ")[1]);
      setEmail(user.empEmailId);
      setDob(user.empDOB);
      setDoj(user.empDOJ);
      setDomain(user.empDomain);
      setDesignation(user.empDesignation);
      setRole(user.loginDetails.role);
      setSalary(user.empSalary);
    }
  }, [user]);

  // useEffect(()=>{

  //   console.log("values = " + JSON.stringify(values))

  // },[values])

  const handleDobChange = (date) => {
    let err = errors;

    setDob(date);

    if (date != null)
      err.dob = date.toString() === "Invalid Date" ? date.toString() : "";
    else err.dob = "";

    setErrors(err);
  };

  const handleDojChange = (date) => {
    let err = errors;

    setDoj(date);

    if (date != null)
      err.doj = date.toString() === "Invalid Date" ? date.toString() : "";
    else err.doj = "";

    setErrors(err);
  };

  const handleChange = (e) => {
    //console.log(e.target);

    const { name, value } = e.target;

    let err = errors;

    if (name === "firstName") {
      setFirstName(value);

      err.firstName = validNameRegex.test(value)
        ? ""
        : "Basic English rule.... Duh!";
    } else if (name === "lastName") {
      setLastName(value);
      err.lastName = validNameRegex.test(value)
        ? ""
        : "Basic English rule.... Duh!";
    } else if (name === "email") {
      setEmail(value);
      err.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
    } else if (name === "pan") {
      if (value.length === 0) {
        setPan(null);

        err.pan = "";
      } else {
        setPan(value);
        err.pan = validPanRegex.test(value) ? "" : "Pan is not valid!";
      }
    } else if (name === "domain") {
      if (value.length === 0) {
        setDomain(null);

        err.domain = "";
      } else {
        setDomain(value);

        err.domain = validDetailRegex.test(value)
          ? value.length >= 4
            ? ""
            : "domain must be 4 characters long"
          : "Only alphabets allowed";
      }
    } else if (name === "designation") {
      if (value.length === 0) {
        setDesignation(null);

        err.designation = "";
      } else {
        setDesignation(value);

        err.designation = validDetailRegex.test(value)
          ? value.length >= 4
            ? ""
            : "designation must be 4 characters long"
          : "Only alphabets allowed";
      }
    } else if (name === "role") {
      if (value.length === 0) {
        setRole(null);

        err.role = "";
      } else {
        setRole(value);

        err.role = validDetailRegex.test(value)
          ? value.length >= 4
            ? ""
            : "role must be 4 characters long"
          : "Only alphabets allowed";
      }
    } else if (name === "salary") {
      if (value.length === 0) {
        setSalary(null);
        err.salary = "";
      } else {
        setSalary(value);

        err.salary = value.indexOf('-')===-1 ?  value.length >= 4 ? "" : "should be greater than 1000" : "Cannot be negative";
      }
    }

    // setValues(vals)
    setErrors(err);

    //  console.log("values = " + JSON.stringify(values))
  };

  const getDateFormat = (date) => {
    console.log("month = " + date.getMonth());
    console.log("year = " + date.getFullYear());
    console.log("day = " + date.getDate());

    let year = date.getFullYear();
    let month =
      date.getMonth() > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

    return month + "/" + day + "/" + year;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(errors)) {
      if (firstName && lastName && email) {
        setOpen(true);

        const updateRequest = {
          designation: designation,
          role: role,
          id: user.empId,
          pan: pan,
          dob: getDateFormat(new Date(dob)),
          doj: getDateFormat(new Date(doj)),
          name: firstName + " " + lastName,
          email: email,
          loginId: user.loginDetails.id,
          domain: domain,
          salary: salary,
        };

        dispatch(actions.editUser(updateRequest));
      } else {
        window.alert("name and email cannot be null");
      }
    } else {
      window.alert("Invalid form");
    }
  };

  if (user == null || user === undefined || user.empName === undefined) {
    console.log("checking for user....");
    return <h1>Loading....</h1>;
  }

  const handleCancel = () => {
    console.log(history);
    history.goBack();
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      {alert && (
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
      )}

      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={handleChange}
                {...(errors.firstName && {
                  error: true,
                  helperText: errors.firstName,
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  {...(errors.lastName && {
                  error: true,
                  helperText: errors.lastName,
                })}
                />
            </Grid>

            <Grid item xs={12}>
              
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                  {...(errors.email && {
                  error: true,
                  helperText: errors.email,
                })}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="pan"
                  label="PAN"
                  type="pan"
                  id="pan"
                  autoComplete="pan"
                  value={pan}
                  onChange={handleChange}
                  {...(errors.pan && {
                  error: true,
                  helperText: errors.pan,
                })}
                />
        
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  id="date-picker-dialog"
                  label="Date of Birth"
                  format="MM/dd/yyyy"
                  value={dob}
                  name="dob"
                  onChange={handleDobChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            {loginUser.roles.includes("ROLE_ADMIN") && (
              <Grid item xs={12}>
                
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Designation"
                    name="designation"
                    value={designation}
                    onChange={handleChange}
                    {...(errors.designation && {
                  error: true,
                  helperText: errors.designation,
                })}
                  />
              
              </Grid>
            )}

            {loginUser.roles.includes("ROLE_ADMIN") && (
              <Grid item xs={12} sm={6}>
               
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Domain"
                    name="domain"
                    value={domain}
                    onChange={handleChange}
                    {...(errors.domain && {
                  error: true,
                  helperText: errors.domain,
                })}
                  />
              </Grid>
            )}

            {loginUser.roles.includes("ROLE_ADMIN") && (
              <Grid item xs={12} sm={6}>
                
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Role"
                    name="role"
                    value={role}
                    onChange={handleChange}
                    {...(errors.role && {
                  error: true,
                  helperText: errors.role,
                })}
                  />
              </Grid>
            )}

            {loginUser.roles.includes("ROLE_ADMIN") && (
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    id="date-picker-dialog"
                    label="Date of Joining"
                    format="MM/dd/yyyy"
                    value={doj}
                    name="doj"
                    onChange={handleDojChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            )}

            {loginUser.roles.includes("ROLE_ADMIN") && (
              <Grid item xs={12}>
                
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Salary"
                    name="salary"
                    value={salary}
                    onChange={handleChange}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    {...(errors.salary && {
                  error: true,
                  helperText: errors.salary,
                })}
                  />
              
              </Grid>
            )}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.cancel}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.update}
          >
            Update
          </Button>
        </form>
        
      </div>
     
    </Container>
  );
}
