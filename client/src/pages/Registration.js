import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function Registration() {
  let navigate = useNavigate();
  const initialValue = {
    password: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(4).max(20).required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post(baseURL + "/auth", data).then(() => {
      //   navigate("/");
      console.log(data);
    });
  };

  return (
    <div className="createPostpage">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John....)"
          />
          <label>password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your password ..."
          />
          <button type="submit">Registration</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
