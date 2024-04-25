import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../Components/Post/PostCard";
import UserReelCard from "../../Components/Reels/UserReelCard";

const tabs = [
  {
    value: "post",
    name: "Post",
  },
  {
    value: "reels",
    name: "Reels",
  },
  {
    value: "saved",
    name: "Saved",
  },
  {
    value: "repost",
    name: "Repost",
  },
];
const posts = [1, 2, 3, 4, 5];
const reels = [1, 2, 3, 4, 5];

const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className="my-10 w-[70%]">
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

          <div className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            {/* UserBiography will be here! */}
          </div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              // Color will be changed!
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              {tabs.map((tab) => (
                <Tab value={tab.value} label={tab.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" && (
              <div className="space-y-5 w-[70%] my-10">
                {posts.map((post) => (
                  <div className="border border-slate-100 rounded-lg">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            )}
            {value === "reels" && (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((reel) => (
                  <div className="border border-slate-100 rounded-lg">
                    <UserReelCard reel={reel} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Card>
  );
};

export default Profile;
