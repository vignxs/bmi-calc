import React from "react";
import { Typography, Box } from "@mui/material";
import { getUserInfoFromSession } from "../utils/SessionUtils";

const MyAccountPage = () => {
  // Retrieve user information from session
  const userInfo = getUserInfoFromSession();
  const { mobile, email } = {'mobile':111111111, 'email': 'email'};

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Account
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Name: {userInfo?.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Mobile: {mobile}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Email: {email}
      </Typography>
      {/* Add additional user details here */}
    </Box>
  );
};

export default MyAccountPage;
