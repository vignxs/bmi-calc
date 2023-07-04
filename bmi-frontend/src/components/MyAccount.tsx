import { Typography, Container, TextField, Box, FormControl, Button } from "@mui/material";
import { getUserInfoFromSession } from "../utils/SessionUtils";
import { TFStyle } from "../utils/Constants";
import ResponsiveAppBar from "../utils/ResponsiveAppBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const MyAccountPage = () => {
  // Retrieve user information from session
  const userInfo = getUserInfoFromSession();
  const  mobile  = 1111111;
  const bmiHistory = [
    { id:1, name: 'akash', mobile: "111111111", age: 30, height: 170, weight: 70, bmi: 24.2 },
    { id:2, name: 'vignesh', mobile: "222222222", age: 35, height: 165, weight: 75, bmi: 27.5 },
    { id:3, name: 'dinesh', mobile: "333333333", age: 28, height: 180, weight: 85, bmi: 26.2 },
    // Add more sample data as needed
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "Name", width: 70 },
    { field: "mobile", headerName: "Mobile", width: 100 },
    { field: "age", headerName: "Age", width: 30},
    { field: "height", headerName: "Height", width: 70 },
    { field: "weight", headerName: "Weight", width: 70 },
    { field: "bmi", headerName: "BMI", width: 80 },
  ];

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
            mb: 2,
          }}
        >
          Account
        </Typography>
        <div style={{width:"500px"}}>
        <TextField
          label="Name"
          name="name"
          value={userInfo?.name}
          fullWidth
          required
        />
        <TextField
          label="Mobile"
          name="mobile"
          value={mobile}
          fullWidth
          required
        />
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
          History
        </Typography>
        <Box sx={{ height: 400,mt:2, width: "100%" }}>
          <DataGrid
            rows={bmiHistory}
            columns={columns}
            initialState={{
                pagination:{
                    paginationModel: {
                        pageSize:5
                    }
                }
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
        </div>
      </Container>
    </ResponsiveAppBar>
  );
};

export default MyAccountPage ;
