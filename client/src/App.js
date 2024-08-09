import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/validate", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({
            ...authState,
            status: false,
          });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
    if (localStorage.getItem("accessToken")) {
      setAuthState({
        ...authState,
        status: true,
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home Page</Link>
            <Link to="/createpost">Create a Post</Link>
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
            <h3> {authState.username}</h3>
          </div>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/createpost" exact Component={CreatePost} />
            <Route path="/post/:id" exact Component={Post} />
            <Route path="/login" exact Component={Login} />
            <Route path="/registration" exact Component={Registration} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
