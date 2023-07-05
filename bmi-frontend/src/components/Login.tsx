import {
  Button,
  Container,
  FormControl,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TFStyle, endpoint } from "../utils/Constants";
import SpaIcon from "@mui/icons-material/Spa";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { setUserInfoInSession } from "../utils/SessionUtils";
import { useSignIn } from "react-auth-kit";

export const Login = () => {
  const history = useNavigate();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const signIn = useSignIn();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    // Handle form submission
    const response = await fetch(endpoint + "/bmi/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.ok) {
      const resp = await response.json();
      signIn({
        token: resp.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { user: resp.name },
      });
      setUserInfoInSession(resp);
      console.log(resp);
      history("/");
    } else {
      const errorResponse = await response.json();
      setError(errorResponse.error);
      console.log(errorResponse);
    }
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
        {error ? (
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize: "1rem",
              letterSpacing: ".1rem",
              color: "red",
              textDecoration: "none",
            }}
          >
            {error}
          </Typography>
        ) : (
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
        )}
        <ValidatorForm style={{ width: "500px" }} onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextValidator
              label="Name"
              name="username"
              value={username}
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
          <Link href="/register" color="inherit">
            Please sign up.
          </Link>
        </Typography>
      </Container>
    </div>
  );
};
