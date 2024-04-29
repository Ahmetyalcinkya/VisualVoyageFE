import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../Components/Post/PostCard";
import UserReelCard from "../../Components/Reels/UserReelCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import { API_BASE_URL } from "../../Config/api";

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
const reels = [1, 2, 3, 4, 5];
const savedPosts = [1, 2, 3, 4, 5];

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [value, setValue] = useState("post");
  const [posts, setPosts] = useState(null);

  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/posts/user/${user.id}`)
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error.response.message));
  }, []);
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
            <Button
              onClick={openHandler}
              sx={{ borderRadius: "1.25rem" }}
              variant="outlined"
            >
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
            <h1 className="py-1 font-bold text-xl">
              {user.firstName + " " + user.lastName}
              {/* User full name will be here! */}
            </h1>
            <h1>
              @
              {user.firstName.toLowerCase() + "_" + user.lastName.toLowerCase()}{" "}
              {/* Username will be here! */}
            </h1>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>24 posts</span>
            {/* PostCount will be here! */}
            <span>{user.followers.length} Followers</span>
            <span>{user.followings.length} followings</span>
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
              {tabs.map((tab, index) => (
                <Tab key={index} value={tab.value} label={tab.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" && (
              <div className="space-y-5 w-[70%] my-10">
                {posts?.length > 0 &&
                  posts?.map((post, index) => (
                    <div
                      key={index}
                      className="border border-slate-100 rounded-lg"
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
              </div>
            )}
            {value === "reels" && (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {reels.map((reel, index) => (
                  <div
                    key={index}
                    className="border border-slate-100 rounded-lg"
                  >
                    <UserReelCard reel={reel} />
                  </div>
                ))}
              </div>
            )}
            {value === "saved" && (
              <div className="space-y-5 w-[70%] my-10">
                {savedPosts.map((post, index) => (
                  <div
                    key={index}
                    className="border border-slate-100 rounded-lg"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            )}
            {value === "repost" && <h4>Repost</h4>}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} closeHandler={closeHandler} />
      </section>
    </Card>
  );
};

export default Profile;
