import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { updateUserProfileAction } from "../../Redux/Auth/auth.action";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, IconButton, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
  overFlow: "scroll-y",
  borderRadius: 3,
};

const ProfileModal = ({ open, closeHandler, user }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      profilePicture: "",
      coverPicture: "",
      biography: "",
    },
    onSubmit: (values) => {
      dispatch(updateUserProfileAction(values));
      closeHandler();
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={closeHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={closeHandler}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem]">
                <img
                  className="w-full h-full rounded-t-md object-cover"
                  src={
                    user?.coverPicture
                      ? user?.coverPicture
                      : "https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
                  }
                  alt="cover-image"
                />
              </div>
              <div className="pl-5">
                <Avatar
                  className="transform -translate-y-24"
                  sx={{ width: "10rem", height: "10rem" }}
                  src={user?.profilePicture}
                />
              </div>
            </div>
            <div className="space-y-3">
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder={user?.firstName}
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder={user?.lastName}
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="biography"
                name="biography"
                label="Biography"
                placeholder={user?.biography}
                value={formik.values.biography}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
