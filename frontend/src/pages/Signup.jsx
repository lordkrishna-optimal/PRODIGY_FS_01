import React, { useState, useContext } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Signup(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/users/signup', form);
      localStorage.setItem('token', res.data.token);
      const me = await API.get('/users/me');
      setUser(me.data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" className="w-full p-2 border rounded" />
        <button disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">{loading ? 'Signing...' : 'Signup'}</button>
      </form>
    </div>
  );
}
