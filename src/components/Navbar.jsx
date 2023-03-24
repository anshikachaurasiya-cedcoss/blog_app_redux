import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logOut } from "../reducer/blogSlice";

const Navbar = (props) => {
  let dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.drawerHandler}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BLOGS
          </Typography>
          <Button
            sx={{ color: "white", cursor: "pointer", textDecoration: "none" }}
            onClick={logOutHandler}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
