import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AptitudeTests from './pages/AptitudeTests';
import AptitudeExam from './pages/AptitudeExam';
import CodingPlatform from './pages/CodingPlatform';
import CodingProblemDetail from './pages/CodingProblemDetail';
import CompanyPrep from './pages/CompanyPrep';
import CompanyDetail from './pages/CompanyDetail';
import MockInterviews from './pages/MockInterviews';
import InterviewSession from './pages/InterviewSession';
import ResumeBuilder from './pages/ResumeBuilder';
import PlacementStats from './pages/PlacementStats';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/stats" element={<PlacementStats />} />
              <Route path="/companies" element={<CompanyPrep />} />
              <Route path="/companies/:slug" element={<CompanyDetail />} />

              {/* Protected Student Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/aptitude"
                element={
                  <ProtectedRoute>
                    <AptitudeTests />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/aptitude/exam/:id"
                element={
                  <ProtectedRoute>
                    <AptitudeExam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coding"
                element={
                  <ProtectedRoute>
                    <CodingPlatform />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coding/:slug"
                element={
                  <ProtectedRoute>
                    <CodingProblemDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interviews"
                element={
                  <ProtectedRoute>
                    <MockInterviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/interviews/session/:id"
                element={
                  <ProtectedRoute>
                    <InterviewSession />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume"
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
