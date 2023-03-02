import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreatePost from './posts';
import Home from './home';
import Login from './auth';
import NavBar from './header/MainNavbar/NavBar';
import {Button} from './sandbox/button';
import {AnimalsDropdown} from './sandbox/dropdown/AnimalsDropdown';
import Comments from './comments/PostComments';

function Huita() {
  return (
    <div>
      <Button label={'Text button'} />
      <div style={{margin: '30px'}}>
        <AnimalsDropdown />
        test text
      </div>
    </div>
  )
}

function App() {
  // const signUserOut = () => {
  //   signOut(auth).then(() => {
  //     authService.setSrc(null);
  //     authService.handleIsAuth();
  //     window.location.pathname = '/login';
  //   });
  // };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/sandbox" element={<Huita />} />
      </Routes>
    </Router>
  );
}

export default App;
