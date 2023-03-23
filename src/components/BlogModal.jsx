import { IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const BlogModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };
  const state = useSelector((state) => state.blogSlice);
  console.log(state.blogDetail);
  return (
    <Modal open={props.modal}>
      <Box sx={style}>
        <Box
          sx={{
            background: "white",
            borderRadius: "5px",
            textAlign: "right",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography></Typography>
          <IconButton onClick={props.openModal}>
            <Typography variant="h5" sx={{ color: "red" }}>
              X
            </Typography>
          </IconButton>
        </Box>
        <Box></Box>
      </Box>
    </Modal>
  );
};

export default BlogModal;
