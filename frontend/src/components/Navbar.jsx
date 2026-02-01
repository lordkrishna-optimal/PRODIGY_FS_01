import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar(){
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const onSearch = (e) => {
    if (e.key === 'Enter') navigate(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="bg-white/60 backdrop-blur p-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">BookReview</Link>
        <div className="flex items-center gap-4">
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            onKeyDown={onSearch}
            placeholder="Search books..."
            className="px-3 py-1 rounded border"
            style={{minWidth: 220}}
          />
          <Link to="/" className="hidden md:inline">Home</Link>
          {user ? (
            <>
              <Link to="/add" className="px-3 py-1 bg-blue-600 text-white rounded">Add Book</Link>
              <Link to="/profile" className="px-2">{user.name}</Link>
              <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1">Login</Link>
              <Link to="/signup" className="px-3 py-1 bg-blue-600 text-white rounded">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
