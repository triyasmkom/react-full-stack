import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const baseURL = "http://localhost:3001";

function Home() {
  const [listOfPosts, setListOfPost] = useState([]);
  let history = useNavigate();

  useEffect(() => {
    axios.get(baseURL + "/posts").then((res) => {
      setListOfPost(res.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              history(`/post/${value.id}`);
            }}
          >
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
