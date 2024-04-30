import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../Config/api";
import { createCommentAction } from "../../Redux/Comment/comment.action";
import InfiniteScroll from "react-infinite-scroll-component";
import { likePostAction } from "../../Redux/Post/post.action";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const authUser = useSelector((store) => store.auth.user);

  const fetchPostsComments = () => {
    axios
      .get(`${API_BASE_URL}/comments/post/${post.id}/${0}`)
      .then((res) => {
        setComments(res.data);
        setOffset(offset + 10);
        setHasMore(true);
      })
      .catch((error) =>
        console.log("Get posts comments error :", error.response.message)
      );
  };
  const showCommentHandler = () => {
    setOffset(0);
    setShowComments(!showComments);
    if (!showComments) {
      fetchPostsComments();
    }
  };

  const fetchNextComments = () => {
    setOffset(offset + 10);
    axios
      .get(`${API_BASE_URL}/comments/post/${post.id}/${offset}`)
      .then((res) => {
        if (res.data.length === 0 || res.data === null) {
          setHasMore(false);
        } else {
          setComments((prev) => [...prev, ...res.data]);
        }
      })
      .catch((error) =>
        console.log("Get posts comments error :", error.response.message)
      );
  };
  const createCommentHandler = (content) => {
    const reqData = {
      postId: post.id,
      comment: {
        content,
      },
    };
    dispatch(createCommentAction(reqData));
    showCommentHandler();
  };

  const likePostHandler = () => {
    dispatch(likePostAction(post.id));
  };

  const isLikedByReqUser = (reqUserId, post) => {
    if (
      post.liked !== null &&
      post.liked?.length > 0 &&
      post.liked !== undefined
    ) {
      for (let user of post.liked) {
        if (reqUserId === user.id) return true;
      }
    }
    return false;
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
        image={post.image ? post.image : post.video}
        // image ? image : video
        // Post height should be fixed!
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span className="font-bold">
            @{user?.firstName + "" + user?.lastName}
            {/* Username will be here ! */}
          </span>{" "}
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton onClick={likePostHandler}>
            {isLikedByReqUser(authUser.id, post) ? (
              <FavoriteIcon color="rgb(249, 24, 128)" />
            ) : (
              <FavoriteBorderIcon />
            )}
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
                  if (!(e.target.value === "")) {
                    createCommentHandler(e.target.value);
                    e.target.value = "";
                  }
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              placeholder="Write your comment..."
              type="text"
            />
          </div>
          <Divider />

          <div id="scrollableDiv" className="h-96 overflow-y-scroll">
            <InfiniteScroll
              dataLength={comments?.length}
              next={fetchNextComments}
              loader={comments.length === 0 ? false : <h4>Loading....</h4>}
              hasMore={hasMore}
              endMessage={<p>You saw all comments.</p>}
              scrollThreshold={0.9}
              scrollableTarget="scrollableDiv"
              className="flex flex-col justify-center items-center gap-y-6 w-full px-3 py-5 text-xs"
            >
              {comments !== null && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="flex w-full items-center gap-x-4">
                    <Avatar
                      sx={{
                        height: "2rem",
                        width: "2rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      {comment?.user?.firstName.slice(0, 1)}
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
            </InfiniteScroll>
          </div>
        </section>
      )}
    </Card>
  );
};

export default PostCard;
