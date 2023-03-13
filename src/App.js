import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import CreatePost from './posts';
import Home from './home';
import Login from './auth';
import NavBar from './header/MainNavbar/NavBar';
import { Button } from './sandbox/button/Button';
import { AnimalsDropdown } from './sandbox/dropdown/AnimalsDropdown';
import { authService } from './auth/auth.service';
import Comments from './comments/PostComments';
import { ClickOutside } from './sandbox/dropdown';

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
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/sandbox" element={<DisplaySandbox />} />
      </Routes>
      <AnimalsDropdown />
    </Router>
  );
}

export default App;
