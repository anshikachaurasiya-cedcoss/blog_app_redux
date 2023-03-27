import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { blogData, fetchBlogs, logOut } from "../reducer/blogSlice";

const Navbar = (props) => {
  const state = useSelector((state) => state.blogSlice);

  let dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  const getAllBlogs = () => {
    let blogsData = localStorage.getItem("BlogsData");
    if (blogsData) {
      dispatch(blogData(JSON.parse(blogsData)));
    } else {
      dispatch(fetchBlogs());
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
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
          {/* on click renders all the blogs */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={getAllBlogs}
          >
            BLOGS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar
              src={state.loginUser.image}
              sx={{ height: 25, width: 25, border: "1px solid white" }}
            />
            <Typography variant="overline">
              Welcome, {state.loginUser.firstName}
            </Typography>
            <Button
              sx={{ color: "white", textDecoration: "none" }}
              onClick={logOutHandler}
            >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
