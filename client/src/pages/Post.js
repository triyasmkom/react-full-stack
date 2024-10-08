import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

function Post() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [postObject, setPostObject] = useState({});
  const [commentObject, setCommentObject] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(baseURL + `/posts/byId/${id}`).then((res) => {
      setPostObject(res.data);
    });

    axios.get(baseURL + `/comments/${id}`).then((res) => {
      setCommentObject(res.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        baseURL + `/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          navigate("/login");
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: res.data.username,
            id: res.data.id,
          };
          setCommentObject([...commentObject, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const onDeleteComment = (id) => {
    axios
      .delete(`${baseURL}/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setCommentObject(
          commentObject.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`${baseURL}/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/");
      });
  };

  const editPost = (option, id) => {
    if (option === "title") {
      let newTitle = prompt("Enter new title:");
      axios
        .put(
          `${baseURL}/posts/title`,
          {
            id: id,
            newTitle,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          setPostObject({ ...postObject, title: newTitle });
        });
    } else {
      let newPostText = prompt("Enter new post text:");
      axios
        .put(
          `${baseURL}/posts/postText`,
          {
            id: id,
            newPostText,
          },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          setPostObject({ ...postObject, postText: newPostText });
        });
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title", postObject.id);
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body", postObject.id);
              }
            }}
          >
            {postObject.postText}
          </div>
          <div className="footer">
            {postObject.username}{" "}
            {authState.username === postObject.username && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {commentObject.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label> Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button onClick={() => onDeleteComment(comment.id)}>X</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
