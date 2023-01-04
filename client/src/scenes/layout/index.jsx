import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/navbar/Navbar";
import Sidebar from "components/sidebar/Sidebar";
// import { useGetUserQuery } from "state/api";

const Layout = () => {

  return (
    <Box width="100%" height="100%">
      <Box display= "flex" width="100%" height="100%">
        <Box flexGrow={1}>
        <Navbar />
        <Sidebar/>
        <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
