import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Hisab from './pages/Hisab';
import UdharDetail from './pages/UdhariDetail';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hisab"
            element={
              <ProtectedRoute>
                <Hisab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/udhar/:id"
            element={
              <ProtectedRoute>
                <UdharDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}
