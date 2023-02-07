import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import CreatePost from "./posts";
import Home from "./home";
import Login from "./auth";
import NavBar from "./header/MainNavbar/NavBar";
import { authService } from "./auth/auth.service";

function App() {
  //isAuth - определяем, зарегался юзер или нет.
  // const [isAuth, setIsAuth] = useState(authService.isAuth);
  const signUserOut = () => {
    signOut(auth).then(() => {
      authService.photoSrc = null;
      authService.handleIsAuth();
      // setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
