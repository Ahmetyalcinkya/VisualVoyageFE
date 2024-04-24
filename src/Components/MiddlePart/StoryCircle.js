import { Avatar } from "@mui/material";
import React from "react";

const StoryCircle = ({ user }) => {
  return (
    <div className="flex flex-col mr-4 items-center cursor-pointer">
      <Avatar sx={{ width: "5rem", height: "5rem" }} src="" />
      <p>Username</p>
      {/* User profile picture will be here! src={user.profilePicture} */}
    </div>
  );
};

export default StoryCircle;
