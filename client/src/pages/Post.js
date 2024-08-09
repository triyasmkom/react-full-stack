import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = "http://localhost:3001";

function Post() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [postObject, setPostObject] = useState({});
  const [commentObject, setCommentObject] = useState([]);
  const [newComment, setNewComment] = useState("");

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
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          navigate("/login");
        } else {
          const commentToAdd = { commentBody: newComment };
          setCommentObject([...commentObject, commentToAdd]);
          setNewComment("");
        }
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="postText">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
