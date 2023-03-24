import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  blogs: [],
  error: "",
  blogDetail: {},
  loginUser: {},
};

export const fetchUsers = createAsyncThunk("blog/fetchUsers", async () => {
  let res;
  try {
    res = await axios.get("https://dummyjson.com/users");
    return res.data.users;
  } catch (error) {
    return error.message;
  }
});

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  let res;
  try {
    res = await axios.get("https://dummyjson.com/posts");
    return res.data.posts;
  } catch (error) {
    console.log(error);
  }
});

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    blogData(state, action) {
      state.blogs = action.payload;
    },
    userData(state, action) {
      state.users = action.payload;
    },
    showBlog(state, action) {
      state.blogDetail = state.blogs[action.payload];
    },
    login(state, action) {
      state.loginUser = action.payload;
      localStorage.setItem("LoginUser", JSON.stringify(state.loginUser));
    },
    logOut(state, action) {
      state.loginUser = {};
      localStorage.setItem("LoginUser", JSON.stringify(state.loginUser));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.users = action.payload;
          localStorage.setItem("UsersData", JSON.stringify(state.users));
          state.error = "successfully fetched";
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchBlogs.pending, (state, action) => {})
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        localStorage.setItem("BlogsData", JSON.stringify(state.blogs));
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { blogData, userData, showBlog, login, logOut } =
  blogSlice.actions;

export default blogSlice.reducer;
