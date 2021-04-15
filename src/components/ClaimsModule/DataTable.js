import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from "@material-ui/icons/Error";
import CancelIcon from "@material-ui/icons/Cancel";
import Container from "@material-ui/core/Container";
import { Icon } from "@iconify/react";
import currencyInr from "@iconify-icons/mdi/currency-inr";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions/claim";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuIcon from "@material-ui/icons/Menu";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Edit from "./EditExpenseClaim.js";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function AddBtn(props) {
  return (
    <Tooltip title="Add claim" arrow>
    <div className={props.add}>
      
    <Button color="primary"  startIcon={ <AddBoxIcon/>}> 
          <Link to={`${props.url}/add`} className="router-lnk">
           <span className={props.addText}>Add Claim</span></Link>
        </Button>
    
    </div>
     </Tooltip>
  );
}

const useChipStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: "green",
    color: "white",
  },
  error: {
    backgroundColor: "red",
    color: "white",
  },
  warning: {
    backgroundColor: "orange",
    color: "white",
  },
  icon: {
    color: "white",
  },
}));

function StatusChip(props) {
  const classes = useChipStyles();

  const label = props.label.toLowerCase();

  return (
    <Chip
      icon={
        label === "approved" ? (
          <CheckCircleOutlineIcon />
        ) : label === "pending" ? (
          <ErrorIcon />
        ) : (
          <CancelIcon />
        )
      }
      label={props.label}
      classes={{
        icon: classes.icon,
      }}
      className={
        label === "approved"
          ? classes.success
          : label === "pending"
          ? classes.warning
          : classes.error
      }
    />
  );
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  add: {
    position: "absolute",
    right: 0,
  },
  addText: {
  
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  deleteBtn: {
    color: "red",
  },
  editBtn: {
    color: "primary",
  },
  approveBtn: {
    color: "green",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ViewExpenseClaims() {
  const classes = useStyles();

  let { path, url } = useRouteMatch();

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const claims = useSelector((state) => state.claimReducer.claims);

  const [openSnack, setOpenSnack] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [selected, setSelected] = React.useState(-1);

  const [selectedEdit, setSelectedEdit] = React.useState(-1);

  const [openEdit, setOpenEdit] = React.useState(false);

  const alert = useSelector((state) => state.claimReducer.alert);

  const [value, setValue] = React.useState("approve");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleApprove = () => {
    console.log(value + " claim = " + selected);
    if (value === "approve") {
      dispatch(actions.approvingClaim(selected));
    } else {
      dispatch(actions.rejectingClaim(selected));
    }
    setOpen(false);
  };

  const handleOpenEdit = (id) => {
    console.log("id = " + id);
    setSelectedEdit(id);
    setOpenEdit(true);
  };

  const handleOpen = (id) => {
    console.log("id = " + id);
    setSelected(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbar />
        <AddBtn add={classes.add} addText={classes.addText} url={url} />
      </GridToolbarContainer>
    );
  };

  useEffect(() => {
    if (alert) {
      setOpenSnack(true);
    }
  }, [alert]);

  const handleCloseSnack = () => {
    dispatch({type : "RESET_ALERT", payload : {}})
    setOpenSnack(false);
  };

  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    console.log("dispatching fetch claims...");

    if (user.roles[0] === "ROLE_USER")
      dispatch(actions.fetchClaimsByEmployee(user.id));
    else dispatch(actions.fetchClaims());
  }, []);

  useEffect(() => {
    if (claims !== null && claims !== undefined) {
      const rows = claims.map((claim, i) => {
       
          return {
            id: claim.expenseCodeId,
            employee : claim.employee.empName,
            amount: claim.expenseAmount,
            startDate: claim.startDate,
            endDate: claim.endDate,
            status: claim.status,
            expense: claim.expense.expenseType,
            project: claim.project.title,
            action: claim.expenseCodeId + " " + claim.status,
          };
        
        
      });
      setRows(rows);
    }
  }, [claims]);

  const handleDelete = (id) => {
    console.log("deleting id  : " + id);
    dispatch(actions.deleteExpenseClaim(id));
  };

  return (
    <Container component="main" maxWidth="l">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Select Approve or Reject
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="approve"
              control={<Radio />}
              label="Approve"
            />
            <FormControlLabel
              value="reject"
              control={<Radio />}
              label="Reject"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApprove} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Edit id={selectedEdit} handleClose={handleCloseEdit} />
        </DialogContent>
      </Dialog>

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

      <div style={{ display: "flex", height: 550, width: "100%" }}>
        <DataGrid
          columns={[
            { field: "id", headerName: "Id", headerAlign: "center"},
           {field : 'employee',headerName:"Employee",headerAlign: "center", width: 150,},
            {
              field: "amount",
              headerName: "Amount",
              width: 120,
              headerAlign: "center",
              renderCell: (params) => (
                <div>
                  <Icon icon={currencyInr} />
                  {params.value}
                </div>
              ),
            },
            {
              field: "startDate",
              headerAlign: "center",
              headerName: "Start Date",
              width: 150,
            },
            {
              field: "endDate",
              headerName: "End Date",
              headerAlign: "center",
             
              width: 150,
            },
            {
              field: "status",
              headerName: "Status",
              headerAlign: "center",
              width: 150,
              renderCell: (params) => <StatusChip label={params.value} />,
            },
            {
              field: "expense",
              headerName: "Expense Type",
              headerAlign: "center",
              width: 150,
            },
            {
              field: "project",
              headerName: "Project Name",
              headerAlign: "center",
              width: 150,
            },
            {
              field: "action",
              headerName: "Actions",
              headerAlign: "center",
              width: 150,
              renderCell: (params) => (
                <>
                  {user.roles.includes("ROLE_ADMIN") && (
                    <Tooltip title="Delete claim" arrow>
                      <IconButton
                        aria-label="delete"
                        className={classes.deleteBtn}
                        onClick={() => handleDelete(params.value.split(" ")[0])}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {params.value.split(" ")[1].toLowerCase() === "pending" && (
                    <Tooltip title="Edit claim" arrow>
                      <IconButton
                        aria-label="Edit"
                        color="primary"
                        onClick={() =>
                          handleOpenEdit(params.value.split(" ")[0])
                        }
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {params.value.split(" ")[1].toLowerCase() === "pending" && !user.roles.includes('ROLE_USER') && (
                    <Tooltip title="Approve or Reject claim" arrow>
                      <IconButton
                        aria-label="approve"
                        className={classes.approveBtn}
                        onClick={() => handleOpen(params.value.split(" ")[0])}
                      >
                        <MenuIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              ),
            },
          ]}
          rows={rows}
          sortModel={[
            {
              field: "id",
              sort: "asc",
            },
          ]}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </Container>
  );
}
