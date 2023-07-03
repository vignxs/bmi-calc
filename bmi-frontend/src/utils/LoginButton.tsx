import { useState, MouseEvent } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

type ProfileButtonProps = {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

const ProfileButton: React.FC<ProfileButtonProps> = ({
  isLoggedIn,
  onLogin,
  onLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    onLogin(); // Call the provided onLogin callback
  };

  const handleLogout = () => {
    handleMenuClose(); // Close the menu
    onLogout(); // Call the provided onLogout callback
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Button onClick={handleMenuOpen}>Profile</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </>
  );
};

export default ProfileButton;
