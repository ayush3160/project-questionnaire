import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Home, Quiz } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar } from './components';

// do not remove (Used for getting current path in tests)
export const LocationDisplay = () => {
  const location = useLocation();
  return (
    <div data-testid="location-display" style={{ display: 'none' }}>
      {location.pathname}
    </div>
  );
};

function App() {
  return (
    <div>
      <Router basename={`/${process.env.REACT_APP_HASH}`}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/questionnaire/:id" element={<Quiz />} />
        </Routes>
        <LocationDisplay />
      </Router>
    </div>
  );
}

export default App;
