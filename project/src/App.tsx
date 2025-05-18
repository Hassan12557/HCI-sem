import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Auth screens
import LoginScreen from './pages/auth/LoginScreen';
import SignUpScreen from './pages/auth/SignUpScreen';
import ChildInfoScreen from './pages/auth/ChildInfoScreen';

// Main layout and screens
import MainLayout from './components/layout/MainLayout';
import DashboardScreen from './pages/dashboard/DashboardScreen';
import PerformanceScreen from './pages/performance/PerformanceScreen';
import MessagesScreen from './pages/messages/MessagesScreen';
import SettingsScreen from './pages/settings/SettingsScreen';

// Settings screens
import EditProfileScreen from './pages/settings/EditProfileScreen';
import PasswordScreen from './pages/settings/PasswordScreen';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route 
            path="/child-info" 
            element={
              <ProtectedRoute>
                <ChildInfoScreen />
              </ProtectedRoute>
            } 
          />
          
          {/* Main layout routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="performance" element={<PerformanceScreen />} />
            <Route path="messages" element={<MessagesScreen />} />
            <Route path="settings" element={<SettingsScreen />} />
          </Route>
          
          {/* Settings routes */}
          <Route 
            path="/edit-profile" 
            element={
              <ProtectedRoute>
                <EditProfileScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/change-password" 
            element={
              <ProtectedRoute>
                <PasswordScreen />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;