import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const Blogs = () => {
  const state = useSelector((state) => state.blogSlice);
  const showBlogData = (item) => {
    // console.log(item);
  };
  return (
    <Grid
      container
      sx={{
        padding: "20px",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      {state.blogs.map((item, index) => {
        // console.log(item);
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
            onClick={() => showBlogData(item)}
          >
            <Typography variant="caption">{item.title}</Typography>
            <img
              src="https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
              alt=""
              style={{ height: "50%", width: "80%" }}
            />
            <IconButton>
              <ThumbUpIcon />
            </IconButton>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Blogs;