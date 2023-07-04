import {
  Button,
  Container,
  FormControl,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TFStyle } from "../utils/Constants";
import SpaIcon from "@mui/icons-material/Spa";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { setUserInfoInSession } from "../utils/SessionUtils";

export const SignUp = () => {
  const history = useNavigate();
  const [name, setName] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "mobileNumber") {
      setMobileNumber(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "repeatPassword") {
      setRepeatPassword(value);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    // Assuming successful sign up, navigate to the home page
    setUserInfoInSession({ name });
    history("/");
  };

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      return value === password;
    });

    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [password]);

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
          SignUp
        </Typography>
        <ValidatorForm style={{ width: "500px" }} onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextValidator
              label="Name"
              name="name"
              value={name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </FormControl>
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
            <TextValidator
              label="Repeat Password"
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={handleInputChange}
              fullWidth
              validators={["isPasswordMatch", "required"]}
              errorMessages={["Password mismatch", "This field is required"]}
              required
            />
          </FormControl>
          <FormControl fullWidth>
            <Button type="submit" variant="outlined" sx={{ mt: 1 }}>
              SignUp
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
          You already have an account?{" "}
          <Link href="/login" color="inherit">
            Please login.
          </Link>
        </Typography>
      </Container>
    </div>
  );
};
