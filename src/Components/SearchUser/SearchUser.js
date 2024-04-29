import { Avatar, Card, CardHeader } from "@mui/material";
import React from "react";

const SearchUser = () => {
  const searchUserHandler = () => {
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
      </div>
      {true && (
        <Card>
          <CardHeader
            onClick={() => {
              clickHandler();
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
  );
};

export default SearchUser;
