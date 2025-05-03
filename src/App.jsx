import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Membership from './pages/Membership';
import Projects from './pages/Projects';
import Innovators from './pages/Innovators';
import TalentPool from './pages/TalentPool';
import TalentProfile from './pages/TalentProfile';
import Dashboard from './pages/admin/Dashboard';
import ContentEditor from './pages/admin/ContentEditor';
import TalentPoolManager from './pages/admin/TalentPoolManager';
import Login from './pages/admin/Login';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('uwiai_admin_token');
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/innovators" element={<Innovators />} />
          <Route path="/Mentor" element={<Mentor />} />
          <Route path="/talent-pool" element={<TalentPool />} />
          <Route path="/talent/:username" element={<TalentProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/:section" 
            element={
              <ProtectedRoute>
                <ContentEditor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/talent-pool" 
            element={
              <ProtectedRoute>
                <TalentPoolManager />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}