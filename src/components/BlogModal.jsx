import { IconButton, Modal, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const editBlog = () => {
    console.log(state.blogDetail);
  };
  console.log(state.blogDetail);
  return (
    <Modal open={props.modal}>
      <Box sx={style}>
        <Box sx={{ background: "white", borderRadius: "5px" }}>
          <Box
            sx={{
              // textAlign: "right",
              display: "flex",
              justifyContent: "flex-end",
              // padding: "5px",
            }}
          >
            <IconButton onClick={props.openModal}>
              <Typography variant="h5" sx={{ color: "red" }}>
                X
              </Typography>
            </IconButton>
          </Box>
          <Box sx={{ padding: "5px" }}>
            <Typography variant="h6">{state.blogDetail.title}</Typography>
            <Typography variant="caption">{state.blogDetail.body}</Typography>
          </Box>
          {state.loginUser.id === state.blogDetail.id ? (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Edit Blog">
                <IconButton onClick={() => editBlog()}>
                  <EditIcon sx={{ color: "blue" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Blog">
                <IconButton>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default BlogModal;
