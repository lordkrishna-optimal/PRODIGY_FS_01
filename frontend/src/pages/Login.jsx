import React, { useState, useContext } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/users/login', form);
      localStorage.setItem('token', res.data.token);
      const me = await API.get('/users/me');
      setUser(me.data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" className="w-full p-2 border rounded" />
        <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
}
