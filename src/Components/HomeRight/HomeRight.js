import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";

const popularUser = [1, 2, 3, 4, 5];

const HomeRight = () => {
  return (
    <div className="pr-5">
      <SearchUser />
      <Card className="p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you!</p>
          <p className="text-xs font-semibold opacity-95">View All</p>
        </div>
        <div className="">
          {popularUser.map((user, index) => (
            <PopularUserCard key={index} user={user} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
