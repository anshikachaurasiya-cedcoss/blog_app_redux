import { Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blogData,
  fetchBlogs,
  fetchUsers,
  showBlogs,
  userData,
} from "../reducer/blogSlice";
import Blogs from "./Blogs";
import Navbar from "./Navbar";
import ModalComp from "./ModalComp";

const BlogPage = () => {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.blogSlice);

  let [drawer, setDrawer] = useState(false);
  let [modal, setModal] = useState(false);

  // function getting the data from local storage and dispatching the functions to set the states
  useEffect(() => {
    let blogsData = localStorage.getItem("BlogsData");
    if (blogsData) {
      dispatch(blogData(JSON.parse(blogsData)));
    } else {
      dispatch(fetchBlogs());
    }
    let usersData = localStorage.getItem("UsersData");
    if (usersData) {
      dispatch(userData(JSON.parse(usersData)));
    } else {
      dispatch(fetchUsers());
    }
  }, []);
  // function handles the sidebar
  const drawerHandler = () => {
    if (drawer) {
      setDrawer(false);
    } else {
      setDrawer(true);
    }
  };
  // function handles the modal
  const openModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  // function shows the users blogs
  const showUsersBlog = (item) => {
    let arr = [];
    state.userBlogs.forEach((ele) => {
      if (ele.userId === item.id) {
        arr.push(ele);
      }
    });
    dispatch(showBlogs(arr));
  };

  return (
    <>
      {/* rendering of navbar component */}
      <Navbar drawerHandler={drawerHandler} />
      {/* rendering of sidebar */}
      <Box onClick={drawerHandler}>
        <Drawer open={drawer}>
          {state.users.length > 0 ? (
            state.users.map((item, index) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    margin: "10px",
                    background: "#dddcdc",
                    borderRadius: "5px",
                    padding: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() => showUsersBlog(item)}
                >
                  <Typography>
                    {item.firstName} {item.lastName}
                  </Typography>
                </Box>
              );
            })
          ) : (
            <></>
          )}
        </Drawer>
      </Box>
      {/* rendering of blogs */}
      {state.blogs.length > 0 ? (
        <Blogs openModal={openModal} />
      ) : (
        // rendering of image if the blogs length is 0
        <Box sx={{ paddingTop: "90px", textAlign: "center" }}>
          <img
            src="https://thumbs.dreamstime.com/b/man-magnifying-glass-rgb-color-icon-unsuccessful-searching-guy-making-research-no-suitable-results-found-isolated-vector-214309001.jpg"
            alt=""
            style={{ height: "200px", width: "200px" }}
          />
          <Typography variant="h6">No Blogs Written by this user!!</Typography>
        </Box>
      )}
      {/* rendering of modal component */}
      <ModalComp modal={modal} openModal={openModal} />
    </>
  );
};

export default BlogPage;
