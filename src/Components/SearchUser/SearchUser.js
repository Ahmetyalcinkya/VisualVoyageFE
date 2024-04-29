import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/Auth/auth.action";
import { createChatAction } from "../../Redux/Message/message.action";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const searchUsers = useSelector((store) => store.auth.searchUsers);

  const searchUserHandler = (e) => {
    setUsername(e.target.value);
    console.log("search user");
    dispatch(searchUserAction(username));
  };

  const clickHandler = (id) => {
    dispatch(createChatAction(id));
  };

  return (
    <div>
      <div className="py-5 relative">
        <input
          type="text"
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search User"
          onChange={searchUserHandler}
        />
        {username &&
          searchUsers?.map((user) => (
            <Card
              key={user.id}
              className="absolute w-full top-[4.5rem] z-10 cursor-pointer"
            >
              <CardHeader
                onClick={() => {
                  clickHandler(user.id);
                  setUsername("");
                }}
                avatar={<Avatar />}
                // Search user profile picture will be here!
                title={user.firstName + " " + user.lastName}
                // Search User full name will be here!
                subheader="@Ahmetyalcinkya"
                // Search Username will be here!
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
