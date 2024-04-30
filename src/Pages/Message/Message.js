import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../Components/SearchUser/SearchUser";
import UserChatCard from "../../Components/UserChatCard/UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessageAction,
  getAllChatsAction,
  getChatsMessagesAction,
} from "../../Redux/Message/message.action";
import ChatIcon from "@mui/icons-material/Chat";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";

const Message = () => {
  const [currentChat, setCurrentChat] = useState();
  const [loading, setLoading] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const messagingUser = currentChat?.users[0];
  const reqUser = currentChat?.users[1];

  const chats = useSelector((store) => store.message.chats);
  const authUser = useSelector((store) => store.auth.user);
  const allMessages = useSelector((store) => store.message.messages);
  const createdMessage = useSelector((store) => store.message.message);
  const dispatch = useDispatch();

  const imageSelectHandler = async (e) => {
    setLoading(true);
    const imageUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imageUrl);
    setLoading(false);
  };
  // Mesajlar ters setleniyor düzeltilecek!
  const createMessageHandler = (value) => {
    const message = {
      chatId: currentChat.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessageAction(message));
  };
  useEffect(() => {
    currentChat && dispatch(getChatsMessagesAction(currentChat.id));
    setMessages(allMessages);
  }, [currentChat]);

  useEffect(() => {
    setMessages([...messages, createdMessage]);
  }, [createdMessage]);

  useEffect(() => {
    dispatch(getAllChatsAction());
  }, []);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {chats.map((chat, index) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentChat(chat);
                          setMessages(chat.messages);
                        }}
                      >
                        <UserChatCard key={index} chat={chat} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center space-x-3">
                  <Avatar />
                  {/* Messaging user profile picture will be here! */}
                  <p>
                    {authUser?.id === reqUser.id
                      ? messagingUser.firstName + " " + messagingUser.lastName
                      : reqUser.firstName + " " + reqUser.lastName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5">
                {messages &&
                  messages.map((message) => <ChatMessage message={message} />)}
              </div>
              <div className="sticky bottom-0 border-l">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt=""
                  />
                )}
                <div className="py-5 flex items-center justify-center space-x-5 px-4">
                  <Avatar />
                  {/* Auth user profile picture will be here! */}
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        createMessageHandler(e.target.value);
                        e.target.value = "";
                        setSelectedImage("");
                      }
                    }}
                    type="text"
                    className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                    placeholder="Type message..."
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={imageSelectHandler}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full space-y-5 justify-center items-center">
              <ChatIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No Chat Selected!</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
