import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';

// Pages - Public
import ContentEditor from './pages/admin/ContentEditor';
import Dashboard from './pages/admin/Dashboard';
import DashboardHome from './pages/admin/DashboardHome';
import Login from './pages/admin/Login';
import TalentPoolManager from './pages/admin/TalentPoolManager';
import Home from './pages/Home';
import Innovators from './pages/Innovators';
import Membership from './pages/Membership';
import Mentor from './pages/Mentor';
import Projects from './pages/Projects';
import TalentPool from './pages/TalentPool';
import TalentProfile from './pages/TalentProfile';

// Pages - Admin

/**
 * Protected Route Component
 * Wraps admin routes to ensure authentication
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('uwiai_admin_token');
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Main Application Component
 * Handles routing and layout for the entire application
 */
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/innovators" element={<Innovators />} />
            <Route path="/mentor" element={<Mentor />} />
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
            >
              <Route index element={<DashboardHome />} />
              <Route path="projects" element={<ContentEditor type="projects" />} />
              <Route path="projects/new" element={<ContentEditor type="projects" mode="create" />} />
              <Route path="projects/:id/edit" element={<ContentEditor type="projects" mode="edit" />} />
              <Route path="events" element={<ContentEditor type="events" />} />
              <Route path="events/new" element={<ContentEditor type="events" mode="create" />} />
              <Route path="events/:id/edit" element={<ContentEditor type="events" mode="edit" />} />
              <Route path="content" element={<ContentEditor type="content" />} />
              <Route path="content/:section" element={<ContentEditor type="content" />} />
              <Route path="content/new" element={<ContentEditor type="content" mode="create" />} />
              <Route path="talent-pool" element={<TalentPoolManager />} />
            </Route>
            
            {/* Catch-all route for admin */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <Navigate to="/admin" replace />
                </ProtectedRoute>
              } 
            />

            {/* 404 catch-all for public routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Toast Notification Container */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="font-sans"
          progressClassName="bg-accent"
        />
      </div>
    </Router>
  );
}

// Prop type definitions
ContentEditor.propTypes = {
  type: PropTypes.oneOf(['projects', 'events', 'content']).isRequired,
  mode: PropTypes.oneOf(['list', 'create', 'edit'])
};

// Default props
ContentEditor.defaultProps = {
  mode: 'list'
};