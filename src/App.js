import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import CreatePost from './posts';
import Home from './home';
import Login from './auth';
import NavBar from './header/MainNavbar/NavBar';
// import { AnimalsDropdown } from './sandbox/dropdown/AnimalsDrop';
import { authService } from './auth/auth.service';
import Comments from './comments/PostComments';

function App() {
  const signUserOut = () => {
    signOut(auth).then(() => {
      authService.setSrc(null);
      authService.handleIsAuth();
      window.location.pathname = '/login';
    });
  };

  const optionsList = [
    { id: 1, value: 'Dog', label: 'Dog' },
    { id: 2, value: 'Cat', label: 'Cat' },
    { id: 3, value: 'Frontender', label: 'Frontender' },
  ];

  const basePath = '/firebase-study';

  return (
    <BrowserRouter basename={`${basePath}`}>
      <NavBar />
      <Routes>
        <Route path={`${basePath}/`} element={<Home />} />
        <Route path={`${basePath}/createpost`} element={<CreatePost />} />
        <Route path={`${basePath}/login`} element={<Login />} />
        <Route path={`${basePath}/comments/:id`} element={<Comments />} />
        {/* <Route exact={`${basePath}/sandbox`} component={<AnimalsDropdown />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
