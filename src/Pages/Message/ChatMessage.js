import React from "react";
import { useSelector } from "react-redux";

const ChatMessage = ({ message }) => {
  const authUser = useSelector((store) => store.auth.user);

  const isReqUsersMessage = authUser.id === message.userId;

  return (
    <div
      className={`flex ${
        isReqUsersMessage ? "justify-end" : "justify-start"
      } text-white`}
    >
      <div
        className={`p-1 ${
          message.image ? "rounded-md" : "px-5 rounded-full"
        } bg-[#191c29]`}
      >
        {message.image && (
          <img
            className="w-[12rem] h-[17rem] object-cover rounded-md"
            src={message.image}
          />
        )}
        <p className={`${true ? "py-2" : "py-1"}`}>{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
