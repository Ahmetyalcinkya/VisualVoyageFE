import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "0.6rem",
  outline: "none",
};
const CreatePostModal = ({ open, closeHandler }) => {
  const { user } = useSelector((store) => store.auth);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {},
    onSubmit: "",
  });

  const imageSelectHandler = () => {};
  const videoSelectHandler = () => {};

  return (
    <Modal
      open={open}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex space-x-4 items-center">
              <Avatar />
              <div>
                <p className="font-bold text-lg">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="text-sm">@{user.lastName.toLowerCase()}</p>
                {/* Username will be here! */}
              </div>
            </div>
            <textarea
              placeholder="Write caption..."
              name="caption"
              id=""
              rows="4"
              value={formik.values.caption}
              onChange={formik.handleChange}
            ></textarea>
            <div className="flex space-x-5 items-center mt-5">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={imageSelectHandler}
                  style={{ display: "none" }}
                  id="image-input"
                />
                <label htmlFor="image-input">
                  <IconButton color="primary">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>
              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={videoSelectHandler}
                  style={{ display: "none" }}
                  id="video-input"
                />
                <label htmlFor="video-input">
                  <IconButton color="primary">
                    <VideoLibraryIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>
            <div>
              {selectedImage && (
                <img
                  className="h-[10rem]"
                  src={selectedImage}
                  alt="selected-image"
                />
              )}
            </div>
            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: "1.5rem" }}
              >
                Post
              </Button>
            </div>
          </div>
        </form>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
