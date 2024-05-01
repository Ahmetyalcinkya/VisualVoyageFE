import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../Components/Post/PostCard";
import UserReelCard from "../../Components/Reels/UserReelCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import { API_BASE_URL, api } from "../../Config/api";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";
import { updateUserProfileAction } from "../../Redux/Auth/auth.action";

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

let profilePicture = "";
let coverPicture = "";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const authUser = useSelector((store) => store.auth.user);
  const [value, setValue] = useState("post");
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const profilePictureSelectHandler = async (e) => {
    setLoading(true);
    profilePicture = await uploadToCloudinary(e.target.files[0], "image");
    dispatch(updateUserProfileAction({ profilePicture: profilePicture }));
    setLoading(false);
    !loading && window.location.reload();
  };

  const coverPictureSelectHandler = async (e) => {
    setLoading(true);
    coverPicture = await uploadToCloudinary(e.target.files[0], "image");
    dispatch(updateUserProfileAction({ coverPicture: coverPicture }));
    setLoading(false);
    !loading && window.location.reload();
  };

  const followUser = (id) => {
    api
      .put(`/api/users/follow/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.message));
  };

  const isUserFollowing = () => {
    if (authUser.followings.includes(user?.id)) {
      return true;
    }
    return false;
  };
  const userFollowingStatus = isUserFollowing();
  const [follow, setFollow] = useState(userFollowingStatus);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response.message);
        setUser(undefined);
      });
  }, []);

  useEffect(() => {
    user &&
      axios
        .get(`${API_BASE_URL}/posts/user/${user?.id}`)
        .then((res) => setPosts(res.data))
        .catch((error) => console.log(error.response.message));
    setFollowerCount(user?.followers.length);
    setFollowingCount(user?.followings.length);
    user && isUserFollowing();
  }, [user]);
  return user !== undefined ? (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          {authUser.id === user?.id ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={coverPictureSelectHandler}
                className="hidden"
                id="cover-input"
              />
              <label htmlFor="cover-input" className="cursor-pointer">
                <img
                  className="w-full h-full rounded-t-lg object-cover"
                  src={
                    user?.coverPicture
                      ? user?.coverPicture
                      : "https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
                  }
                  alt="CoverImage"
                />
              </label>
            </>
          ) : (
            <img
              className="w-full h-full rounded-t-lg object-cover"
              src={
                user?.coverPicture
                  ? user?.coverPicture
                  : "https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
              }
              alt="CoverImage"
            />
          )}
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          {authUser.id === user?.id ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={profilePictureSelectHandler}
                className="hidden"
                id="image-input"
              />
              <label htmlFor="image-input" className="cursor-pointer">
                <Avatar
                  className="transform -translate-y-24"
                  sx={{ width: "10rem", height: "10rem" }}
                  src={user?.profilePicture ? user?.profilePicture : ""}
                />
              </label>
            </>
          ) : (
            <Avatar
              className="transform -translate-y-24"
              sx={{ width: "10rem", height: "10rem" }}
              src={user?.profilePicture ? user?.profilePicture : ""}
            />
          )}
          {authUser.id === user?.id ? (
            <Button
              onClick={openHandler}
              sx={{ borderRadius: "1.25rem" }}
              variant="outlined"
            >
              Edit Profile
            </Button>
          ) : follow ? (
            <Button
              onClick={() => {
                followUser(user?.id);
                setFollowerCount(followerCount - 1);
                setFollow(!follow);
              }}
              sx={{ borderRadius: "1.25rem" }}
              variant="contained"
            >
              Following
            </Button>
          ) : (
            <Button
              onClick={() => {
                followUser(user?.id);
                setFollowerCount(followerCount + 1);
                setFollow(!follow);
              }}
              sx={{ borderRadius: "1.25rem" }}
              variant="outlined"
            >
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <div className="">
            <h1 className="py-1 font-bold text-xl">
              {user?.firstName + " " + user?.lastName}
            </h1>
            <h1>@{user?.username}</h1>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>24 posts</span>
            {/* PostCount will be here! */}
            <span>{followerCount} Followers</span>
            <span>{followingCount} followings</span>
          </div>

          <div className="">{user?.biography}</div>
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
        <ProfileModal open={open} closeHandler={closeHandler} user={user} />
      </section>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  ) : (
    <div className="w-full h-full flex items-center justify-center text-3xl font-bold">
      The user you were looking for was not found!
    </div>
  );
};

export default Profile;
