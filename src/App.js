import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import CreatePost from './posts';
import Home from './home';
import Login from './auth';
import NavBar from './header/MainNavbar/NavBar';
import Button from './sandbox/button/button';
import Dropdown from './sandbox/dropdown/Dropdown';
import { authService } from './auth/auth.service';

const options = [
  { id: 1, value: 'Dog', label: 'Dog' },
  { id: 2, value: 'Cat', label: 'Cat' },
  { id: 3, value: 'Frontender', label: 'Frontender' },
];

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
      <Dropdown options={options} />
    </Router>
  );
}

export default App;
