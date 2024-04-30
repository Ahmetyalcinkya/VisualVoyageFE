import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const UserChatCard = ({ chat }) => {
  const authUser = useSelector((store) => store.auth.user);
  const messagingUser = chat.users[0];
  const reqUser = chat.users[1];

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
        title={
          authUser?.id === reqUser.id
            ? messagingUser.firstName + " " + messagingUser.lastName
            : reqUser.firstName + " " + reqUser.lastName
        }
        subheader="Username"
        // Messaged username will be here!
      ></CardHeader>
    </Card>
  );
};

export default UserChatCard;
