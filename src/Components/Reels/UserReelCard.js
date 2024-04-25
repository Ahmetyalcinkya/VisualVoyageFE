import { Card } from "@mui/material";
import React from "react";

const UserReelCard = ({ reel }) => {
  return (
    <Card className="w-full h-full p-4">
      <video
        controls
        className="w-full h-full rounded-md"
        src="https://videos.pexels.com/video-files/3629511/3629511-hd_720_900_24fps.mp4"
      />
      {/* Reel source will be here! */}
    </Card>
  );
};

export default UserReelCard;
