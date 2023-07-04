import {
  Button,
  Container,
  FormControl,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import {useNavigate}   from "react-router-dom";
import { TFStyle } from "../utils/Constants";
import SpaIcon from "@mui/icons-material/Spa";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { setUserInfoInSession } from "../utils/SessionUtils";

export const Login = () => {
  const history = useNavigate();
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "mobileNumber") {
      setMobileNumber(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    const userInfo = { name: "JohnDoe" }; // Replace with your login logic
    setUserInfoInSession(userInfo);
    // Assuming successful login, navigate to the home page
    history("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
    <Container maxWidth="sm" sx={TFStyle}>
      <SpaIcon sx={{ mr: 1, mb: 1, fontSize: "1.8rem", color: "#000000" }} />
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
          mb: 4,
        }}
      >
        BMI Tracker
      </Typography>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          fontFamily: "Geologica",
          fontWeight: 500,
          letterSpacing: ".1rem",
          color: "#000000",
          textDecoration: "none",
        }}
      >
        Login
      </Typography>
      <ValidatorForm style={{ width: "500px" }} onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextValidator
            label="Mobile Number"
            name="mobileNumber"
            value={mobileNumber}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextValidator
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <Button type="submit" variant="outlined" sx={{ mt: 1 }}>
            Login
          </Button>
        </FormControl>
      </ValidatorForm>
      <Typography
        variant="body2"
        component="p"
        sx={{
          mt: 2,
          textAlign: "center",
          color: "#000000",
        }}
      >
        Don't have an account?{" "}
        <Link href="/signup" color="inherit">
          Please sign up.
        </Link>
      </Typography>
    </Container>
    </div>
  );
};
