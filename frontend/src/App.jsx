import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import './App.css';


const RootRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Navigate to="/user" replace />;
  }

  return <Navigate to="/login" replace />;
};


const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <main className="main-content">
        <Routes>

          <Route path="/" element={<RootRedirect />} />


          <Route
            path="/login"
            element={
              isAuthenticated() ? <Navigate to="/user" replace /> : <AuthPage />
            }
          />


          <Route
            path="/user"
            element={
              isAuthenticated() ? (
                <div className="user-page">
                  <h1>Добро пожаловать!</h1>
                  <p>Вы успешно вошли в систему</p>
                  <button
                    onClick={() => {
                      localStorage.removeItem('authToken');
                      window.location.reload();
                    }}
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;