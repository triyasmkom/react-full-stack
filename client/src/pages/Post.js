import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const baseURL = "http://localhost:3001";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  useEffect(() => {
    axios.get(baseURL + `/posts/byId/${id}`).then((res) => {
      setPostObject(res.data);
    });
  });
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="postText">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
  );
}

export default Post;
