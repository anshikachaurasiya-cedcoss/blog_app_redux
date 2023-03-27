import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addLikes,
  delBlog,
  edit,
  removeLikes,
  showBlog,
} from "../reducer/blogSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const Blogs = (props) => {
  let dispatch = useDispatch();
  const state = useSelector((state) => state.blogSlice);
  let [likeStyle, setLikeStyle] = useState("outlined");
  // function shows the blogs data
  const showBlogData = (index) => {
    dispatch(showBlog(index));
    props.openModal();
  };
  // function adds or removes likes
  const likesHandler = (index, e) => {
    e.stopPropagation();
    let obj = {};
    if (Object.keys(state.blogs[index]).includes("liked")) {
      if (state.blogs[index].liked) {
        likeStyle = "outlined";
        dispatch(removeLikes({ index: index }));
      } else {
        likeStyle = "contained";
        dispatch(addLikes({ index: index }));
      }
    } else {
      obj = { liked: true };
      dispatch(addLikes({ index: index, obj: obj }));
      likeStyle = "contained";
    }
    setLikeStyle(likeStyle);
  };
  // function deletes the blog
  const deleteBlog = (e, index) => {
    e.stopPropagation();
    dispatch(delBlog(index));
  };
  // function edits the blog
  const editBlog = (e, index) => {
    e.stopPropagation();
    dispatch(edit(index));
    props.openModal();
  };

  return (
    <Grid
      container
      sx={{
        padding: "90px 20px 20px 20px",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      {/* rendering of blogs  */}
      {state.blogs.map((item, index) => {
        return (
          <Grid
            sm={3}
            md={2}
            key={index}
            sx={{
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              padding: "5px",
              background: "#faf8f8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "2px",
              cursor: "pointer",
            }}
            onClick={() => showBlogData(index)}
          >
            <Typography variant="caption">{item.title}</Typography>
            <img
              src="https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              alt=""
              style={{ height: "50%", width: "80%" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.reactions} Likes :
              <IconButton onClick={(e) => likesHandler(index, e)}>
                {item.liked && item.liked !== undefined ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Box>
            {state.loginUser.id === item.userId ? (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title="Edit Blog">
                  <IconButton onClick={(e) => editBlog(e, index)}>
                    <EditIcon sx={{ color: "blue" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Blog">
                  <IconButton onClick={(e) => deleteBlog(e, index)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <></>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Blogs;
