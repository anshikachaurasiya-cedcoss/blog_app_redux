import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogPage from "./BlogPage";
import Login from "./Login";

const Main = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlogPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Main;
