import { Avatar, Button, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PopularUserCard = ({ user }) => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={<Button size="small">Follow</Button>}
        title="Ahmet Can Yalçınkaya"
        // User full name
        subheader="@Ahmetyalcinkya"
        // Username
      />
    </div>
  );
};

export default PopularUserCard;
