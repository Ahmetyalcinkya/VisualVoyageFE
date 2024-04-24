import { Avatar } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
const users = [5, 6, 7, 2, 7, 98];
const MiddlePart = () => {
  // Users will be fetched in here and send to StoryCircle
  return (
    <div className="px-20">
      <section className="flex justify-center items-center p-5 rounded-b-lg">
        <div className="flex flex-col mr-4 items-center cursor-pointer">
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {users.map((user) => (
          <StoryCircle user={user} />
        ))}
      </section>
      <section></section>
    </div>
  );
};

export default MiddlePart;
