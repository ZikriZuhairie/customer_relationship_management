import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import OverviewChart from "components/OverviewChart";
import "./overview.css";

const Overview = () => {
  const [view, setView] = useState("units");

  return (
    <div className="box_overview-container">
    <Box m="1.5rem 2.5rem">
      <h3>Overview</h3>
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
    </div>
  );
};

export default Overview;