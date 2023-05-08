import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from './posts';
import Home from './home';
import Login from './auth';
import NavBar from './header/MainNavbar/NavBar';
import Comments from './comments/PostComments';
// import { AnimalsDropdown } from './sandbox/dropdown/AnimalsDrop';

function App() {
  const optionsList = [
    { id: 1, value: 'Dog', label: 'Dog' },
    { id: 2, value: 'Cat', label: 'Cat' },
    { id: 3, value: 'Frontender', label: 'Frontender' },
  ];

  return (
    <Router basename="/">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comments/:id" element={<Comments />} />
        {/* <AnimalsDropdown /> */}
      </Routes>
    </Router>
  );
}

export default App;
