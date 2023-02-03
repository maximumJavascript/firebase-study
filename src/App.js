import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import CreatePost from "./posts";
import Home from "./home";
import Login from "./auth";
import NavBar from "./header/NavBar";
// import { photoSrc } from "./auth/login";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); //isAuth - определяем, зарегался юзер или нет.
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <NavBar isAuth={isAuth} signUserOut={signUserOut} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
