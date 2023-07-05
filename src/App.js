import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { CreatePost } from './posts';
import { Home } from './home';
import { Login } from './auth';
import { Header } from './header/';
import { ErrorBoundary } from './errorBoundary';
import { NotifyModal } from './notifications/NotifyModal';

export function App() {
  return (
    <Router basename="/">
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/comments/:id" element={<Home withComments />} />
        </Routes>
        <NotifyModal />
      </ErrorBoundary>
    </Router>
  );
}
