import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = {
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
};
const Login = () => {
  const [formValues, setFormValues] = useState();

  const submitHandler = (values) => {
    console.log("submit handler", values);
  };
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
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
