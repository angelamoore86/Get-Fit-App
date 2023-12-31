import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import FitnessLogPage from './pages/FitnessLogPage';
import IntakeLogPage from './pages/IntakeLogPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from "./pages/LoginPage";
import NavigationBar from "./NavigationBar";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/fitnesslog" 
              element={
                <PrivateRoute>
                  <FitnessLogPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/intakelog" 
              element={
                <PrivateRoute>
                  <IntakeLogPage />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes> 
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
