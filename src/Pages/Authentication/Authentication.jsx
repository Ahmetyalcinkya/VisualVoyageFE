import { Grid } from "@mui/material";
import React from "react";
import Login from "./Login";

const Authentication = () => {
  return (
    <div>
      <Grid container>
        <Grid className="h-screen overflow-hidden" item xs={7}>
          <img
            className="h-full w-full"
            src="https://bpb-us-w2.wpmucdn.com/blogs.iu.edu/dist/4/62/files/2020/11/social-media-3846597_1280.png"
            alt="people-connecting"
          />
        </Grid>
        <Grid item xs={5}>
          <div className="px-20 flex flex-col justify-center h-full">
            <div className="card p-8">
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="logo text-center">VisualVoyage</h1>
                <p className="text-center text-sm w-[70%]">
                  Connecting Live, Sharing Stories: Your Social World, Your Way!
                </p>
              </div>
              <Login />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
