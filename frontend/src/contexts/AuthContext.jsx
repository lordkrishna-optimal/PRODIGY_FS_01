import React, { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token');
      if (!token) { setInitializing(false); return; }
      try {
        const res = await API.get('/users/me');
        setUser(res.data);
      } catch (err) {
        console.error('auth load', err);
        localStorage.removeItem('token');
      } finally {
        setInitializing(false);
      }
    };
    load();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};
