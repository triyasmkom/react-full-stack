import Home from "./pages/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Home Page</Link>
        <Link to="/createpost">Create a Post</Link>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/createpost" exact Component={CreatePost} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
