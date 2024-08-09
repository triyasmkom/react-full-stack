import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const baseURL = "http://localhost:3001";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(4).max(20).required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const login = () => {
    axios
      .post(baseURL + "/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          alert(res.data.error);
        } else {
          localStorage.setItem("accessToken", res.data.accessToken);
          setAuthState(true);
          navigate("/");
        }
      });
  };

  return (
    <div className="loginContainer">
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
