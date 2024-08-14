import React, { useState } from "react";
import axios from "axios";
const baseURL = "http://localhost:3001";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChangePassword = () => {
    axios
      .put(
        `${baseURL}/auth/changepassword`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert(res.data);
        }
      });
  };
  return (
    <div>
      <h1>ChangePassword</h1>
      <input
        type="password"
        placeholder="old password ...."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="new password ...."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          onChangePassword();
        }}
      >
        Save Change
      </button>
    </div>
  );
}

export default ChangePassword;
