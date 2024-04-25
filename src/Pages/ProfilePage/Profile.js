import { Avatar, Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  return (
    <div className="py-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-lg"
            src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
            alt="CoverImage"
            // Cover image will be here!
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src=""
          />
          {/* User profile picture will be here! */}
          {true ? (
            <Button sx={{ borderRadius: "1.25rem" }} variant="outlined">
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "1.25rem" }} variant="outlined">
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <div className="">
            <h1 className="py-1 font-bold text-xl">Ahmet Can Yalçınkaya</h1>
            {/* User full name will be here! */}
            <h1>@Ahmetyalcinkya</h1>
            {/* Username will be here! */}
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>24 posts</span>
            {/* PostCount will be here! */}
            <span>512 followers</span>
            {/* FollowerCount will be here! */}
            <span>512 followings</span>
            {/* FollowingCount will be here! */}
          </div>

          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
