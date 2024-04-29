import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";

const SearchUser = () => {
  const [username, setUsername] = useState("");

  const searchUserHandler = (e) => {
    setUsername(e.target.value);
    console.log("search user");
  };

  const clickHandler = (id) => {
    console.log(id);
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
        {username && (
          <Card className="absolute w-full top-[4.5rem] z-10 cursor-pointer">
            <CardHeader
              onClick={() => {
                clickHandler();
                setUsername("");
              }}
              avatar={<Avatar />}
              // Search user profile picture will be here!
              title="Ahmet Can Yalçınkaya"
              // Search User full name will be here!
              subheader="@Ahmetyalcinkya"
              // Search Username will be here!
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
