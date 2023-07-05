import React, { useState } from "react";
import {
  Button,
  Container,
  InputAdornment,
  FormControl,
  FormControlLabel,
  Box,
  Radio,
  RadioGroup,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { TFStyle, endpoint } from "../utils/Constants";
import ResponsiveAppBar from "../utils/ResponsiveAppBar";
import { getUserInfoFromSession } from "../utils/SessionUtils";

function BMIHome() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [mobile, setmobile] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBMI] = useState<string>("00.00");
  const [category , setCategory ] = useState<string>("empty");
  const userInfo = getUserInfoFromSession();
  let user: number | null = null;


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "mobile":
        setmobile(value);
        break;
      case "gender":
        setGender(value);
        break;
      default:
        break;
    }
  };
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  const handleClear = () => {
    setName("");
    setAge("");
    setHeight("");
    setWeight("");
    setmobile("");
    setBMI("00.00");
    setCategory("empty")
  };


  const handleSubmit = async() => {
    // Perform BMI calculation

      if (userInfo) {
        user = userInfo.id;
      }
      const data = {
        user,
        name,
        gender,
        height,
        weight,
        age,
        mobile,
        bmi,
        category
      };

      const response = await fetch(endpoint  + "/bmi/api/bmi/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response)

      if (response.ok) {
        const result = await response.json();
        setBMI(result.bmi);
        setCategory(result.category);
        console.log("BMI record created:", result);
      } else {
        console.error("Failed to create BMI record");
      }    
    };

  return (
    <ResponsiveAppBar>
      <Container maxWidth="sm" sx={TFStyle}>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            fontFamily: "Geologica",
            fontWeight: 500,
            color: "#000000",
            textDecoration: "none",
          }}
        >
          BMI Calculator
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ValidatorForm onSubmit={handleSubmit}>
            <FormControl fullWidth={true}>
              <TextValidator
                label="Name"
                name="name"
                value={name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </FormControl>
            <FormControl component="fieldset" fullWidth={true} sx={{ mb: 2 }}>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth={true}>
              <TextValidator
                type="number"
                label="Age"
                name="age"
                value={age}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </FormControl>
            <FormControl fullWidth={true}>
              <TextValidator
                type="number"
                label="Height"
                name="height"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                value={height}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </FormControl>
            <FormControl fullWidth={true}>
              <TextValidator
                type="number"
                label="Weight"
                name="weight"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                value={weight}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </FormControl>
            <FormControl fullWidth={true}>
              <TextValidator
                label="Mobile Number"
                onChange={handleInputChange}
                name="mobile"
                value={mobile}
                type="number"
                validators={["matchRegexp:^[6789]\\d{9}$"]}
                errorMessages={["Please enter 10 digit mobile number"]}
                fullWidth
                required
              />
            </FormControl>
            <div
              style={{
                display: "flex",
                width: "500px",
                justifyContent: "space-between",
                marginTop: "10px",
                position: "relative",
              }}
            >
              <Button variant="outlined" type="submit" sx={{ width: "48%" }}>
                Submit
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                sx={{ width: "48%" }}
              >
                Clear
              </Button>
            </div>
          </ValidatorForm>
        </div>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            fontFamily: "Geologica",
            fontWeight: 500,
            color: "#000000",
            textDecoration: "none",
            mt: 2,
          }}
        >
          Results
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "500px",
            justifyContent: "space-between",
            marginTop: "10px",
            position: "relative",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: "150px",
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgb(33, 43, 54)",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              backgroundImage: "none",
              overflow: "hidden",
              position: "relative",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              borderRadius: "16px",
              zIndex: 0,
              display: "flex",
              alignItems: "center",
              padding: "24px",
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                component="h6"
                sx={{
                  margin: 0,
                  fontWeight: 600,
                  lineHeight: 1.57143,
                  fontSize: "1.2rem",
                  fontFamily: "Geologica",
                  mt: 2,
                }}
              >
                Your BMI is
              </Typography>

              <Typography
                variant="h3"
                component="h3"
                color="primary"
                sx={{
                  margin: 0,
                  fontWeight: 600,
                  lineHeight: 1.57143,
                  fontSize: "2rem",
                  fontFamily: "Public Sans, sans-serif",
                  mt: 2,
                }}
              >
                {bmi}
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{
              marginTop: "20px",
              padding: "10px",
              height: "380px",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              boxShadow:
                "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
              width: "230px",
            }}
          >
            {category === "empty" ? (
              <>
                {loading && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
              </>
            ) : (
              <img
                src={"/" + category+ ".jpg"}
                alt={"/" + category+ ".jpg"}
                style={{
                  display: loading ? "none" : "block",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                onLoad={handleImageLoaded}
                onError={handleImageLoaded}
              />
            )}
          </Paper>
        </div>
      </Container>
    </ResponsiveAppBar>
  );
}

export default BMIHome;
