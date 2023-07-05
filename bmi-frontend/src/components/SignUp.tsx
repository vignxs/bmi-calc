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

export const Register = () => {
  const history = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [error, setError ] = React.useState("")
  const signIn = useSignIn();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "repeatPassword") {
      setRepeatPassword(value);
    }
  };

  const handleSubmit = async() => {
    // Handle form submission
    const response = await fetch( endpoint + "/bmi/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: password,
        email: email,
      }),
    });
     if (response.ok) {
       // Assuming successful sign up, navigate to the home page
       const resp = await response.json();
       console.log(resp)
       signIn({
         token: "resp.token",
         expiresIn: 3600,
         tokenType: "Bearer",
         authState: { user: "test" },
       }); 
       setUserInfoInSession(resp);
       history("/");
     } else {
      const errorResponse = await response.json();
       setError(errorResponse)
     }

    
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
        {error ? (
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              fontFamily: "Poppins",
              fontWeight: 300,
              fontSize:'1rem',
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
            SignUp
          </Typography>
        )}

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
              label="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              fullWidth
              validators={["isEmail"]}
              errorMessages={["Invalid email format"]}
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
