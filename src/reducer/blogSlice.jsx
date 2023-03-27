import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  blogs: [],
  error: "",
  blogDetail: {},
  loginUser: {},
  comments: [],
  editBlog: {},
  userBlogs: [],
};
// function fetches the users data from dummy json
export const fetchUsers = createAsyncThunk("blog/fetchUsers", async () => {
  let res;
  try {
    res = await axios.get("https://dummyjson.com/users");
    return res.data.users;
  } catch (error) {
    return error.message;
  }
});
// function fetches the blogs data from dummy json
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
    // function sets the state of all blogs
    blogData(state, action) {
      state.blogs = action.payload;
      state.userBlogs = action.payload;
    },
    // function sets the state of users
    userData(state, action) {
      state.users = action.payload;
    },
    // function opens the particular blog
    showBlog(state, action) {
      state.editBlog = {};
      state.blogDetail = state.blogs[action.payload];
    },
    // function sets the state of login user
    login(state, action) {
      state.loginUser = action.payload;
      localStorage.setItem("LoginUser", JSON.stringify(state.loginUser));
    },
    // function sets the state after user logouts from application
    logOut(state, action) {
      state.loginUser = {};
      localStorage.setItem("LoginUser", JSON.stringify(state.loginUser));
    },
    // function add likes
    addLikes(state, action) {
      if (Object.keys(action.payload).includes("obj")) {
        Object.assign(state.blogs[action.payload.index], action.payload.obj);
        state.blogs[action.payload.index].reactions++;
      } else {
        state.blogs[action.payload.index].liked = true;
        state.blogs[action.payload.index].reactions++;
      }
      localStorage.setItem("BlogsData", JSON.stringify(state.blogs));
    },
    // function remove likes
    removeLikes(state, action) {
      state.blogs[action.payload.index].liked = false;
      state.blogs[action.payload.index].reactions--;
      localStorage.setItem("BlogsData", JSON.stringify(state.blogs));
    },
    // function gets all commnets from localStorage
    getComments(state, action) {
      state.comments = action.payload;
      localStorage.setItem("blogComments", JSON.stringify(state.comments));
    },
    // function adds comments
    addComments(state, action) {
      state.comments.push(action.payload);
      localStorage.setItem("blogComments", JSON.stringify(state.comments));
    },
    // function deletes blog
    delBlog(state, action) {
      state.blogs.splice(action.payload, 1);
    },
    // function edits the blog
    edit(state, action) {
      state.editBlog = state.blogs[action.payload];
    },
    // function updates the blog
    updateBlog(state, action) {
      state.blogs[action.payload.id].title = action.payload.inpState.title;
      state.blogs[action.payload.id].body = action.payload.inpState.content;
      state.editBlog = {};
      localStorage.setItem("BlogsData", JSON.stringify(state.blogs));
    },
    // function shows the blogs written by user
    showBlogs(state, action) {
      state.blogs = state.userBlogs;
      if (action.payload.length > 1) {
        state.blogs = action.payload;
      } else {
        state.blogs = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.userBlogs = action.payload;
        localStorage.setItem("BlogsData", JSON.stringify(state.blogs));
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  blogData,
  userData,
  showBlog,
  login,
  logOut,
  addLikes,
  removeLikes,
  getComments,
  addComments,
  delBlog,
  edit,
  updateBlog,
  showBlogs,
} = blogSlice.actions;

export default blogSlice.reducer;
