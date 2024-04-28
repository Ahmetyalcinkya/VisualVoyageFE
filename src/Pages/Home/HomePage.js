import { Grid } from "@mui/material";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomeRight from "../../Components/HomeRight/HomeRight";
import MiddlePart from "../../Components/MiddlePart/MiddlePart";
import CreateReelsForm from "../../Components/Reels/CreateReelsForm";
import Reels from "../../Components/Reels/Reels";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Profile from "../ProfilePage/Profile";

const HomePage = () => {
  const location = useLocation();

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>
        <Grid
          item
          lg={location.pathname === "/" ? 6 : 9}
          className="px-5 flex justify-center"
          xs={12}
        >
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreateReelsForm />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>
        {location.pathname === "/" && (
          <Grid item lg={3} className="relative">
            <div className="sticky top-0 w-full">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
