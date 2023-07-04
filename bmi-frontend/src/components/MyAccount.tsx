import { Typography, Container, TextField, Box } from "@mui/material";
import { getUserInfoFromSession } from "../utils/SessionUtils";
import { TFStyle, columns } from "../utils/Constants";
import ResponsiveAppBar from "../utils/ResponsiveAppBar";
import { DataGrid } from "@mui/x-data-grid";

const MyAccountPage = () => {
  // Retrieve user information from session
  const userInfo = getUserInfoFromSession();
  const  mobile  = 1111111;
  const bmiHistory = [
    {
      id: 1,
      name: "akash",
      mobile: "111111111",
      age: 30,
      height: 170,
      weight: 70,
      bmi: 24.2,
      result: "normal",
    },
    {
      id: 2,
      name: "vignesh",
      mobile: "222222222",
      age: 35,
      height: 165,
      weight: 75,
      bmi: 27.5,
      result: "obese",
    },
    {
      id: 3,
      name: "dinesh",
      mobile: "333333333",
      age: 28,
      height: 180,
      weight: 85,
      bmi: 26.2,
      result: "underweight",
    },
    {
      id: 4,
      name: "dhanush",
      mobile: "333333333",
      age: 28,
      height: 180,
      weight: 85,
      bmi: 26.2,
      result: "overweight",
    },
    // Add more sample data as needed
  ];



 

  return (
    <ResponsiveAppBar>
      <Container maxWidth="md" sx={TFStyle}>
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
        <div style={{ width: "500px" }}>
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
        </div>

        <Box sx={{ height: 400, mt: 2, width: "90%" }}>
          <DataGrid
            rows={bmiHistory}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>
    </ResponsiveAppBar>
  );
};

export default MyAccountPage ;
