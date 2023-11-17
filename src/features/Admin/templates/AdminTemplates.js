import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ShopIcon from "@mui/icons-material/Shop";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, useHistory } from "react-router-dom";
import "./style.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    height: "100vh",
    width: "100vw",
    overflowY: "scroll",
  },
  appBar: {
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: "20px",
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    marginLeft: -drawerWidth,
  },
  contentShift: {
    marginLeft: 0,
  },
  iconUser: {
    fontSize: 35,
    marginRight: 8,
  },
}));
const AdminTemplates = ({ Component, ...restProps }) => {
  const { auth } = useSelector((state) => state);
  // const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (auth?.user?.isAdmin === false) {
      return history.push("/");
    }
  }, [auth, history]);

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                    Menu Links
                  </Typography>
                </div>
                <div className="d-flex align-items-center">
                  <AccountCircleTwoToneIcon className={classes.iconUser} />
                  <Typography variant="h6" noWrap>
                    {/* {nguoiDung.taiKhoan} */}
                  </Typography>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>

              <List>
                <NavLink to="/admin/userManagement">
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleAltOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="User Management" />
                  </ListItem>
                </NavLink>
                <NavLink to="/admin/productManagement">
                  <ListItem button>
                    <ListItemIcon>
                      <ProductionQuantityLimitsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Product Management" />
                  </ListItem>
                </NavLink>
                <NavLink to="/admin/orderManagement">
                  <ListItem button>
                    <ListItemIcon>
                      <ShopIcon />
                    </ListItemIcon>
                    <ListItemText primary="Order Management" />
                  </ListItem>
                </NavLink>
                <NavLink to="/admin/chatManagement">
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Conversations" />
                  </ListItem>
                </NavLink>
                <NavLink to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Go back home" />
                  </ListItem>
                </NavLink>
              </List>
            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <Component />
            </main>
          </div>
        );
      }}
    ></Route>
  );
};

export default AdminTemplates;
