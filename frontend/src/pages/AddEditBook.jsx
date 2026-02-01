import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEditBook(){
  const { id } = useParams();
  const [form, setForm] = useState({ title:'', author:'', description:'', genre:'', year:'' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!id) return;
    (async ()=> {
      try {
        const res = await API.get(`/books/${id}`);
        setForm({
          title: res.data.title || '',
          author: res.data.author || '',
          description: res.data.description || '',
          genre: res.data.genre || '',
          year: res.data.year || ''
        });
      } catch (err) { console.error(err); }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await API.put(`/books/${id}`, form);
      } else {
        await API.post('/books', form);
      }
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full p-2 border rounded" />
        <input value={form.author} onChange={e=>setForm({...form,author:e.target.value})} placeholder="Author" className="w-full p-2 border rounded" />
        <input value={form.genre} onChange={e=>setForm({...form,genre:e.target.value})} placeholder="Genre" className="w-full p-2 border rounded" />
        <input value={form.year} onChange={e=>setForm({...form,year:e.target.value})} placeholder="Year" className="w-full p-2 border rounded" />
        <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded" />
        <div>
          <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}
