import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import CreatePost from "./posts";
import Home from "./home";
import Login from "./auth";
// import { photoSrc } from "./auth/login";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); //isAuth - определяем, зарегался юзер или нет.
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      // тут не вышло заюзать navigate, как мы делаем после логина, поэтому через window. Это все из-за того, что вне Router-a мы не можем это использовать.
      window.location.pathname = "/login";
    });
  };
  let photoSrc = localStorage.getItem("photoSrc");
  if (!photoSrc) {
    photoSrc =
      "https://sun9-7.userapi.com/r90oL_k8H2knEzaCqzV57L9GDlahcVwenNU3Sw/--QJZ-RiNV4.jpg";
  }
  return (
    <Router>
      <header>
        <nav>
          <ul className="leftLinks">
            <li className="newsLink">
              <a href="#" className="news">
                News
              </a>
            </li>
            <li>
              <a href="#" className="portal">
                Portal
              </a>
            </li>
          </ul>
          <div className="centerLinks">
            <Link to="/" className="homeContainer">
              <span className="navText homeText">Home</span>
            </Link>
            {!isAuth ? (
              <Link to="/login">
                <button className="loginBtn">
                  <span className="navText loginText">Login</span>
                </button>
              </Link>
            ) : (
              <>
                <Link to="/createpost">
                  <span className="navText createPostText">Create Post</span>
                </Link>
                <button onClick={signUserOut} className="logOutBtn">
                  <span className="logOutBtnText">Log Out</span>
                </button>
              </>
            )}
          </div>

          <ul className="rightLinks">
            <li className="newsLeftLink">
              <div className="newsContainer">
                <a href="#" className="newsLeft">
                  News
                </a>
                <div className="dash"></div>
              </div>
            </li>
            <li className="blogLink">
              <a className="blog">Blog</a>
            </li>
            <li className="authPicture">
              <img className="authImg" src={photoSrc} />
            </li>
          </ul>
        </nav>
      </header>

      {/* element в каждом роуте - копмонент, который будет рендериться, когда мы будем переходить на него в приложении*/}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
