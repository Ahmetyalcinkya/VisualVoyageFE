import { Avatar, Card, IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";

const users = [5, 6, 7, 2, 7, 98];

const MiddlePart = () => {
  // Users will be fetched in here and send to StoryCircle
  const openCreatePostModalHandler = () => {
    console.log("open post modal");
  };

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
      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar src="" />
          {/* Authenticated user profile picture */}
          <input
            readOnly
            className="outline-none w-[90%] rounded-full px-5 bg-transparent border border-[#3b4054]"
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={openCreatePostModalHandler}>
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={openCreatePostModalHandler}>
              <VideoLibraryIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={openCreatePostModalHandler}>
              <ArticleIcon />
            </IconButton>
            <span>Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        <PostCard />
      </div>
    </div>
  );
};

export default MiddlePart;
