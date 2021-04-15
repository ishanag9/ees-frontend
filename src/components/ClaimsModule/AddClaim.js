import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/claim';
import * as projectActions from '../../actions/project';
import * as expenseActions from '../../actions/expense';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    cancel: {
        margin: theme.spacing(2),
    },
    add: {
        margin: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddExpenseClaim() {

    const classes = useStyles();

     const user = JSON.parse(localStorage.getItem('user'))

    const projects = useSelector((state) => state.projectReducer.projects);
    const [projectList, setProjectList] = React.useState();

    const expenses = useSelector((state) => state.expenseReducer.expenses);
    const [expenseList, setExpenseList] = React.useState();

    const dispatch = useDispatch()

    const [amount, setAmount] = React.useState(0)
    const [sd, setSd] = React.useState(new Date())
    const [ed, setEd] = React.useState(new Date())
    const [project, setProject] = React.useState('')
    const [expense, setExpense] = React.useState('')
    const [openSnack, setOpenSnack] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const [errors, setErrors] = React.useState({
        amount: 0,
    });

    const alert = useSelector(state => state.claimReducer.alert)

    const added = useSelector(state => state.claimReducer.added)

    const history = useHistory();

    const addExpenseClaim = (e) => {

        e.preventDefault()

        if (validateForm(errors)) {
            console.log("adding claim....");
            if (amount && sd && ed && expense && project) {
                const claim = {
                    amount: parseInt(amount),
                    startDate: changeDateFormat(sd),
                    endDate: changeDateFormat(ed),
                    expenseId: expense,
                    employeeId: user.id,
                    projectId: project,
                }
                dispatch(actions.addExpenseClaim(claim))
                setOpen(true)
            }
            else {
                window.alert('Fields cannot be null')
            }
        } else {
            console.error("Invalid Form");
        }
    }

    useEffect(() => {
        dispatch(projectActions.fetchProjects());
    }, []);

    useEffect(() => {
        if (added)
            history.goBack()
    }, [added]);

    useEffect(() => {
        if (projects != null) {
            let list = projects.map((pro) => {
                return (
                    <option value={pro.projectCode}>{pro.title}</option>
                );
            });
            setProjectList(list);
        }
    }, [projects]);

    useEffect(() => {
        dispatch(expenseActions.fetchExpenses());
        console.log(expenses);
    }, []);

    useEffect(() => {
        if (expenses != null) {
            let eList = expenses.map((exp) => {
                return (
                    <option value={exp.expenseCode}>{exp.expenseType}</option>
                );
            });
            setExpenseList(eList);
        }
    }, [expenses]);

    useEffect(() => {
        if (alert && alert.type === 'error') {
            setOpen(false)
            setOpenSnack(true)
        }
    }, [alert]);

    const handleCloseSnack = () => {
        setOpenSnack(false)
    }

    const handleCancel = () => {
        console.log(history)
        history.goBack()
    }

    const changeDateFormat = (date) => {
        if (((date.getMonth() + 1) < 10) && (date.getDate() < 10)) {
            return "0" + (date.getMonth() + 1) + "/" + "0" + date.getDate() + "/" + date.getFullYear();
        }
        else if (((date.getMonth() + 1) < 10) && (date.getDate() > 9)) {
            return "0" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        }
        else if (((date.getMonth() + 1) > 9) && (date.getDate() < 10)) {
            return (date.getMonth() + 1) + "/" + "0" + date.getDate() + "/" + date.getFullYear();
        }
        else {
            return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        }
    }

    const handleStartDate = (date) => {
        setSd(date);
    };

    const handleEndDate = (date) => {
        setEd(date);
    };

    const handleChange = (e) => {
        var err = errors;
        const { name, value } = e.target;
        if (name === 'amount') {
            setAmount(value)
            err.amount =
                value >= 0 ? "" : "Amount must be greater than Zero!!!";
        }
        else if (name === 'project') {
            setProject(value)
        }
        else if (name === 'expense') {
            setExpense(value)
        }
        setErrors(err);
    }

    return (
        <Container component="main" maxWidth="xs">

            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity={alert ? alert.type : 'success'}>
                    {alert ? alert.message : 'sample'}
                </Alert>
            </Snackbar>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CssBaseline />

            <div className={classes.paper}>
                <form className={classes.form} onSubmit={addExpenseClaim} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {errors.amount.length > 0 ? (
                                <TextField name="amount" onChange={handleChange} fullWidth required
                                    value={amount}
                                    error
                                    id="amount"
                                    label="Enter Amount"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={handleChange}
                                    helperText={errors.amount}
                                />
                            ) : (
                                <TextField
                                    autoComplete="amt"
                                    name="amount"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="amount"
                                    label="Expense Amount"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Start Date</Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker required
                                    fullWidth
                                    id="start date"
                                    value={sd}
                                    name='startDate'
                                    onChange={handleStartDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>End Date</Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker required
                                    minDate={sd}
                                    fullWidth
                                    id="end date"
                                    value={ed}
                                    name='endDate'
                                    onChange={handleEndDate}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Expense Type</span>
                            </div>
                            <NativeSelect fullWidth value={expense} name='expense' required onChange={handleChange}>
                                <option aria-label="None" value="" >{'None'}</option>
                                {expenseList}
                            </NativeSelect>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Project</span>
                            </div>
                            <NativeSelect fullWidth value={project} name='project' required onChange={handleChange}>
                                <option aria-label="None" value="" >{'None'}</option>
                                {projectList}
                            </NativeSelect>
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.cancel}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" className={classes.add}>
                        Add Expense Claim
                    </Button>

                </form>
            </div>
        </Container>
    )
}