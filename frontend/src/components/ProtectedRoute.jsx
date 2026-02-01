import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }){
  const { user, initializing } = useContext(AuthContext);
  if (initializing) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
