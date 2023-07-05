import { useEffect, useState } from "react";
import { Typography, Container, TextField, Box } from "@mui/material";
import { getUserInfoFromSession } from "../utils/SessionUtils";
import { TFStyle, columns, endpoint } from "../utils/Constants";
import ResponsiveAppBar from "../utils/ResponsiveAppBar";
import { DataGrid } from "@mui/x-data-grid";

const MyAccountPage = () => {
  const [bmiHistory, setBmiHistory] = useState([]);
  const userInfo = getUserInfoFromSession();
  const [email, setEmail] = useState("");


  useEffect(() => {
    // Function to fetch BMI records for the user
    const fetchBMIRecords = async (userId: number) => {
      try {
        const response = await fetch(endpoint + `/bmi/api/bmi/?user_id=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch BMI records");
        }
        const bmiRecords = await response.json();
        setBmiHistory(bmiRecords.bmi_records);
        setEmail(bmiRecords.email)
        console.log(bmiRecords);
      } catch (error) {
        console.error("Error fetching BMI records:", error);
      }
    };

    // Fetch BMI records for the user
    const userId = userInfo?.id; // Replace with the actual user ID
    if (userId) {
      fetchBMIRecords(userId);
    }
  }, []);

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
            label="Email"
            name="email"
            value={email}
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

export default MyAccountPage;
