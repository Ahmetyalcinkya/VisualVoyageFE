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
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  getPostCommentsAction,
} from "../../Redux/Comment/comment.action";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const { comments } = useSelector((store) => store.comment);

  const showCommentHandler = () => {
    setShowComments(!showComments);
    setLoading(true);
    const offset = 0;
    setTimeout(() => {
      comments.length === 0 && dispatch(getPostCommentsAction(post.id, offset));
      setLoading(false);
    }, 2000);
  };

  const createCommentHandler = (content) => {
    const reqData = {
      postId: post.id,
      comment: {
        content,
      },
    };
    dispatch(createCommentAction(reqData));
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
                  createCommentHandler(e.target.value);
                  console.log("Enter pressed *************", e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              placeholder="Write your comment..."
              type="text"
            />
          </div>
          <Divider />

          <div className="px-3 space-y-2 py-5 text-xs">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col justify-center items-center gap-y-6 w-full">
                {/* Infinity scroll will be added to comment! */}
                {comments !== null && comments.length > 0 ? (
                  comments.map((comment) => (
                    <div className="flex w-full items-center gap-x-4">
                      <Avatar
                        sx={{
                          height: "2rem",
                          width: "2rem",
                          fontSize: "0.8rem",
                        }}
                      >
                        {comment.user.firstName.slice(0, 1)}
                      </Avatar>
                      <div className="flex flex-col w-full">
                        <p className="font-bold">@{comment.content}</p>
                        {/* username will be here! */}
                        <div className="flex justify-between items-center w-full">
                          <p className="pl-2">{comment.content}</p>
                          <p className="font-bold">
                            {comment.createdAt.slice(0, 10)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4 className="text-center font-bold text-sm">
                    There is no comment yet.
                  </h4>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
