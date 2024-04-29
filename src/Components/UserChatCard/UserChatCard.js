import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";

const UserChatCard = () => {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <MoreHoriz />
          </IconButton>
        }
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)",
            }}
            src=""
          />
        }
        // Messaged user profile picture will be here!
        title="User full name"
        subheader="New Message"
      ></CardHeader>
    </Card>
  );
};

export default UserChatCard;
