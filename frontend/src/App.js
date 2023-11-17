import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import FitnessLogPage from './pages/FitnessLogPage';
import IntakeLogPage from './pages/IntakeLogPage';
import FitnessGoalPage from './pages/FitnessGoalPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/fitnessgoal" element={<FitnessGoalPage />} />
            <Route path="/fitnesslog" element={<FitnessLogPage />} />
            <Route path="/intakelog" element={<IntakeLogPage />} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes> 
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
