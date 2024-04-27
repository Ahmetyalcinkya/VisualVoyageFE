import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatIcon from "@mui/icons-material/Chat";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { API_BASE_URL } from "../../Config/api";

const PostCard = ({ post }) => {
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const showCommentHandler = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/users/${post.userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user?.firstName + " " + user?.lastName}
        subheader="@Ahmetyalcinkya"
        // Username will be here !
      />
      <CardMedia
        component="img"
        height="194"
        image={post.image}
        // image ? image : video
        // Post height should be fixed!
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton>
            {true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={showCommentHandler}>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>
      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />
            <input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  console.log("Enter pressed *************", e.target.value);
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              placeholder="Write your comment..."
              type="text"
            />
          </div>
          <Divider />

          <div className="mx-3 space-y-2 my-5 text-xs">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-5">
                <Avatar
                  sx={{ height: "2rem", width: "2rem", fontSize: "0.8rem" }}
                >
                  A
                </Avatar>
                <p>nice image</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
