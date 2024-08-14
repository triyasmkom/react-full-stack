import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbUpAlt } from "@mui/icons-material";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function Home() {
  const [listOfPosts, setListOfPost] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(baseURL + "/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          setListOfPost(res.data.listOfPosts);
          setLikedPosts(
            res.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const onLikes = (PostId) => {
    axios
      .post(
        baseURL + "/likes",
        {
          PostId,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        // alert(res.data.liked);
        setListOfPost(
          listOfPosts.map((post) => {
            if (post.id === PostId) {
              if (res.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(PostId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != PostId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, PostId]);
        }
      });
  };

  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>

              <div className="buttons">
                <ThumbUpAlt
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                  onClick={() => {
                    onLikes(value.id);
                  }}
                />

                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
