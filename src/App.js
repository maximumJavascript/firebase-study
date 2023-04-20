import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import CreatePost from './posts';
import Home from './home';
import Login from './auth';
import NavBar from './header/MainNavbar/NavBar';
import { authService } from './auth/auth.service';
import Comments from './comments/PostComments';
import { useEffect } from 'react';
// import { AnimalsDropdown } from './sandbox/dropdown/AnimalsDrop';

function App() {
  const signUserOut = () => {
    signOut(auth).then(() => {
      authService.setSrc(null);
      authService.handleIsAuth();
      window.location.pathname = '/firebase-study';
    });
  };

  const optionsList = [
    { id: 1, value: 'Dog', label: 'Dog' },
    { id: 2, value: 'Cat', label: 'Cat' },
    { id: 3, value: 'Frontender', label: 'Frontender' },
  ];

  const basePath = '/firebase-study';

  if (!window.location.pathname.includes(`${basePath}/`)) {
    window.location.replace(`${basePath}/`);
  }
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={basePath} element={<Home />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path='/login' element={<Login />} />
        <Route path='/comments/:id' element={<Comments />} />
        {/* <AnimalsDropdown /> */}
      </Routes>
    </Router>
  );
}

export default App;
