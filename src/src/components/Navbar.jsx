import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/dashboard" className="font-semibold text-blue-700">Hisab-Kitab</Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/hisab">Daily Hisab</Link>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
