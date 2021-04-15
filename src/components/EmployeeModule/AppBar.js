import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import RedeemIcon from "@material-ui/icons/Redeem";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useRouteMatch, useHistory, NavLink } from "react-router-dom";
import * as actions from "../../actions/user";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    //display:'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
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
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  icon: {
    color: "white",
    margin: 10,
    padding: theme.spacing(1),

    "&:hover": {
      boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
      transform: "scale(1.05)",
      cursor: "pointer",
    },
  },
  activeIcon: {
    color: "pink",
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    borderBottom: "2px solid pink",
  },

  menuItem: {
    marginLeft: theme.spacing(0),
  },

  activeMenu: {
    // border : '2px solid blue',
    // boxShadow: "8px 8px 16px 8px rgba(0, 0, 250, 0.2)",
    color: "violet",
  },
}));

export default function PrimarySearchAppBar() {
  let { url } = useRouteMatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();

  const dispatch = useDispatch();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () => {
    dispatch(actions.logout());

    history.push("/signin");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink
          to={`${url}`}
          activeClassName={classes.activeMenu}
          exact
          className="router-lnk"
          onClick={handleMobileMenuClose}
        >
          <Grid container spacing={4} className={classes.menuItem}>
            <Grid item xs={2}>
              <DashboardIcon />
            </Grid>
            <Grid item xs={4} style={{ marginLeft: "20px" }}>
              Dashboard
            </Grid>
          </Grid>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink
          to={`${url}/profile`}
          activeClassName={classes.activeMenu}
          className="router-lnk"
          onClick={handleMobileMenuClose}
        >
          <Grid container spacing={4} className={classes.menuItem}>
            <Grid item xs={2}>
              <AccountCircleIcon />
            </Grid>
            <Grid item xs={4} style={{ marginLeft: "20px" }}>
              View Profile
            </Grid>
          </Grid>
        </NavLink>
      </MenuItem>

      {user.roles[0] === "ROLE_ADMIN" && (
        <MenuItem>
          <NavLink
            to={`${url}/employees`}
            activeClassName={classes.activeMenu}
            className="router-lnk"
            onClick={handleMobileMenuClose}
          >
            <Grid container spacing={4} className={classes.menuItem}>
              <Grid item xs={2}>
                <GroupIcon />
              </Grid>
              <Grid item xs={4} style={{ marginLeft: "20px" }}>
                Employees
              </Grid>
            </Grid>
            
          </NavLink>
        </MenuItem>
      )}

{user.roles[0] === "ROLE_ADMIN" && (
        <MenuItem>
          <NavLink
            to={`${url}/projects`}
            activeClassName={classes.activeMenu}
            className="router-lnk"
            onClick={handleMobileMenuClose}
          >
            <Grid container spacing={4} className={classes.menuItem}>
              <Grid item xs={2}>
                <AssignmentIcon />
              </Grid>
              <Grid item xs={4} style={{ marginLeft: "20px" }}>
                Projects
              </Grid>
            </Grid>
            
          </NavLink>
        </MenuItem>
      )}

{user.roles[0] === "ROLE_ADMIN" && (
        <MenuItem>
          <NavLink
            to={`${url}/expenses`}
            activeClassName={classes.activeMenu}
            className="router-lnk"
            onClick={handleMobileMenuClose}
          >
            <Grid container spacing={4} className={classes.menuItem}>
              <Grid item xs={2}>
                <AttachMoneyIcon />
              </Grid>
              <Grid item xs={4} style={{ marginLeft: "20px" }}>
                Expenses
              </Grid>
            </Grid>
            
          </NavLink>
        </MenuItem>
      )}

      <MenuItem>
        <NavLink
          to={`${url}/claims`}
          activeClassName={classes.activeMenu}
          className="router-lnk"
          onClick={handleMobileMenuClose}
        >
          <Grid container spacing={4} className={classes.menuItem}>
            <Grid item xs={2}>
              <RedeemIcon />
            </Grid>
            <Grid item xs={4} style={{ marginLeft: "20px" }}>
              Expense Claims
            </Grid>
          </Grid>
        </NavLink>
      </MenuItem>

      <MenuItem>
        <ListItem className="drawertabs" onClick={handleOpen}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText className={classes.itemText} primary={"Logout"} />
        </ListItem>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <strong>Cancel</strong>
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            <strong>Logout</strong>
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            Expense Manager
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Tooltip title="Dashboard"  TransitionComponent={Zoom}  >
            <NavLink
              to={`${url}`}
              activeClassName={classes.activeIcon}
              exact
              className={classes.icon}
            >
              <DashboardIcon />
            </NavLink>
            </Tooltip>
            <Tooltip title="Profile"  TransitionComponent={Zoom}  >
            <NavLink
              to={`${url}/profile`}
              activeClassName={classes.activeIcon}
              className={classes.icon}
            >
              <AccountCircleIcon />
            </NavLink>
            </Tooltip>
            {user.roles[0] === "ROLE_ADMIN" && (
              <Tooltip title="Employees"  TransitionComponent={Zoom}  >
              <NavLink
                to={`${url}/employees`}
                activeClassName={classes.activeIcon}
                className={classes.icon}
              >
                <GroupIcon />
              </NavLink>
              </Tooltip>
            )}



<Tooltip title="Claims"  TransitionComponent={Zoom}  >
            <NavLink
              to={`${url}/claims`}
              activeClassName={classes.activeIcon}
              className={classes.icon}
            >
              <RedeemIcon />
            </NavLink>
              </Tooltip>
            {user.roles[0] === "ROLE_ADMIN" && (
              <Tooltip title="Projects"  TransitionComponent={Zoom}  >
              <NavLink
                to={`${url}/projects`}
                activeClassName={classes.activeIcon}
                className={classes.icon}
              >
                <AssignmentIcon />
              </NavLink>
              </Tooltip>
            )}

{user.roles[0] === "ROLE_ADMIN" && (
              <Tooltip title="Expenses"  TransitionComponent={Zoom}  >
              <NavLink
                to={`${url}/expenses`}
                activeClassName={classes.activeIcon}
                className={classes.icon}
              >
                <AttachMoneyIcon />
              </NavLink>
              </Tooltip>
            )}

<Tooltip title="Logout"  TransitionComponent={Zoom}  >
            <div className={classes.icon} onClick={handleOpen}>
              <ExitToAppIcon />
            </div>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
