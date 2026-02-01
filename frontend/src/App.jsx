import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import AddEditBook from './pages/AddEditBook';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<ProtectedRoute><AddEditBook /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><AddEditBook /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
