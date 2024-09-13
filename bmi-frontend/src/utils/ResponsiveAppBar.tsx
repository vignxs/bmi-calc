import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import SpaIcon from "@mui/icons-material/Spa";
import { Box } from "@mui/material";
import { setUserInfoInSession, getUserInfoFromSession } from "../utils/SessionUtils";
import { useState, MouseEvent } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";


interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const ProfileButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    // Check if user is already logged in
    const userInfo = getUserInfoFromSession();
    if (userInfo) {
      setIsLoggedIn(true);
      setUsername(userInfo.name);
    }
    console.log(userInfo);
  }, []);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const signOut = useSignOut();
  const handleLogin = () => {
    setIsLoggedIn(true);
    const userInfo = { id: 1, name: "JohnDoe" };
    setUsername(userInfo.name);
    setUserInfoInSession(userInfo);
  };
  
  const handleLogout = () => {
    signOut()
    setIsLoggedIn(false);
    setUsername("");
    sessionStorage.removeItem("userInfo");
  };


  return (
    <>
      {isLoggedIn ? (
        <>
          <Button onClick={handleMenuOpen}>{username}</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={Link}
              to="/myaccount"
              onClick={handleMenuClose}
            >
              My Account
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              BMI Calculator
            </MenuItem>
            <MenuItem component={Link} to="/register" onClick={handleLogout}>
              Signup
            </MenuItem>
            <MenuItem component={Link} to="/login" onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button component={Link} to="/signin" onClick={handleLogin}>
          Login
        </Button>
      )}
    </>
  );
};

export default function ResponsiveAppBar(props: Props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar sx={{ backgroundColor: "#FFFFFF" }}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SpaIcon sx={{ mr: 1, color: "#000000" }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: "Geologica",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "#000000",
                  textDecoration: "none",
                }}
              >
                BMI Tracker
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <ProfileButton />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box>{props.children}</Box>
    </React.Fragment>
  );
}
