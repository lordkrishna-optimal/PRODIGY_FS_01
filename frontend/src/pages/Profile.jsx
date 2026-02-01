import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Profile(){
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      // simple fetch of first 50 books then filter; backend could have user endpoint
      const res = await API.get('/books', { params: { limit: 50 } });
      setMyBooks(res.data.books.filter(b => b.addedBy === user?._id || b.addedBy === user?._id));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ if (user) fetch(); }, [user]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Profile</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <h3 className="font-semibold">Name</h3>
          <p>{user?.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Your Books</h3>
          {loading ? <div className="skeleton h-20" /> : (
            myBooks.length ? myBooks.map(b => (
              <div key={b._id} className="flex justify-between border-b py-2">
                <div>
                  <div className="font-medium">{b.title}</div>
                  <div className="text-sm text-gray-600">{b.author}</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/edit/${b._id}`} className="px-2 py-1 border rounded">Edit</Link>
                </div>
              </div>
            )) : <p className="text-gray-500">No books yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
