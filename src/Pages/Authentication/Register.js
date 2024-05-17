import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUserAction } from "../../Redux/Auth/auth.action";

const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name at least 3 characters")
    .required("Please enter your first name"),
  lastName: Yup.string()
    .min(2, "Last name at least 2 characters")
    .required("Please enter your last name"),
  gender: Yup.string()
    .oneOf(["male", "female"])
    .required("Please pick a gender"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
});

const Register = () => {
  const jwt = useSelector((store) => store.auth.jwt);
  const [gender, setGender] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (values) => {
    values.gender = gender;
    dispatch(registerUserAction({ data: values }));
  };

  const changeHandler = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if (jwt) {
      window.location.reload();
    }
  }, [jwt]);
  return (
    <>
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="firstName"
                placeholder="First Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="lastName"
                placeholder="Last Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="lastName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <RadioGroup
                onChange={changeHandler}
                row
                aria-label="gender"
                name="gender"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>
      <div className="flex gap-2 pt-2 items-center justify-center">
        <p>Already have an account ? </p>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  );
};

export default Register;
