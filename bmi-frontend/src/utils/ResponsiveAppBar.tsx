import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ProfileButton from "./LoginButton";
import SpaIcon from "@mui/icons-material/Spa";
import { Box } from "@mui/material";

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

export default function ResponsiveAppBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true); // Update the isLoggedIn state to true
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update the isLoggedIn state to false
    // Additional logout logic, such as clearing user data or tokens, can be added here
  };

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
              <SpaIcon sx={{ mr: 1, color:'#000000' }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
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
              <ProfileButton
                isLoggedIn={isLoggedIn}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
