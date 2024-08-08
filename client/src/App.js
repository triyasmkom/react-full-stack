import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
const baseURL = "http://localhost:3001";

function App() {
  const [listOfPosts, setListOfPost] = useState([]);

  useEffect(() => {
    axios.get(baseURL + "/posts").then((res) => {
      setListOfPost(res.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
