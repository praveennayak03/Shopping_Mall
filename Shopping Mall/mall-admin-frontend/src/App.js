import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Shops from './pages/Shops';
import Employees from './pages/Employees';
import GuestBook from './pages/GuestBook';
import Notifications from './pages/Notifications';

function PrivateRoute({ children }) {
  const admin = localStorage.getItem('admin');
  return admin ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/shops" element={
          <PrivateRoute><Shops /></PrivateRoute>
        } />
        <Route path="/employees" element={
          <PrivateRoute><Employees /></PrivateRoute>
        } />
        <Route path="/guestbook" element={
          <PrivateRoute><GuestBook /></PrivateRoute>
        } />
        <Route path="/notifications" element={
          <PrivateRoute><Notifications /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;