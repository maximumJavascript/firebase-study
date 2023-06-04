import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { CreatePost } from './posts';
import { Home } from './home';
import { Login } from './auth';
import { NavBar } from './header/MainNavbar/NavBar';
import { ErrorBoundary } from './errorBoundary';
// import { AnimalsDropdown } from './sandbox/dropdown/AnimalsDrop';

export function App() {
  const optionsList = [
    { id: 1, value: 'Dog', label: 'Dog' },
    { id: 2, value: 'Cat', label: 'Cat' },
    { id: 3, value: 'Frontender', label: 'Frontender' },
  ];

  return (
    <Router basename="/">
      <NavBar />
      <ErrorBoundary>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comments/:id" element={<Home withComments={true} />} />
          {/* <AnimalsDropdown /> */}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}
