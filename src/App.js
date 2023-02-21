import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import CreatePost from './posts';
import Home from './home';
import Login from './auth';
import NavBar from './header/MainNavbar/NavBar';
import Button from './sandbox/Button/Button';
import Dropdown from './sandbox/Dropdown/Dropdown';
import { authService } from './auth/auth.service';

function App() {
  const signUserOut = () => {
    signOut(auth).then(() => {
      authService.setSrc(null);
      authService.handleIsAuth();
      window.location.pathname = '/login';
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
      <Button label={'Text button'} />
      <Dropdown />
    </Router>
  );
}

export default App;
