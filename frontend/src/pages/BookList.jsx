import React, { useEffect, useState } from 'react';
import API from '../api';
import BookCard from '../components/BookCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function useQuery(){ return new URLSearchParams(useLocation().search); }

export default function BookList(){
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('-createdAt');

  const q = useQuery().get('q') || '';
  const navigate = useNavigate();

  const fetchBooks = async (p=1) => {
    setLoading(true);
    try {
      const res = await API.get('/books', { params: { page: p, q, genre, sort } });
      setBooks(res.data.books);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ fetchBooks(1); }, [q, genre, sort]);

  const onSearchClick = () => {
    navigate(`/?q=${encodeURIComponent(q)}`);
    fetchBooks(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <div className="flex gap-2">
          <select value={genre} onChange={e=>setGenre(e.target.value)} className="border p-1 rounded">
            <option value="">All Genres</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Sci-Fi</option>
            <option>Fantasy</option>
            <option>Romance</option>
          </select>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="border p-1 rounded">
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
            <option value="-year">Newest Year</option>
            <option value="-rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({length:6}).map((_,i)=>(
            <div key={i} className="p-4 rounded bg-white skeleton h-36" />
          ))}
        </div>
      ) : (
        <>
          {books.length === 0 ? (
            <div className="text-center py-10 bg-white rounded">
              <p>Hmm, we couldn't find any books for '{q}'. How about <Link to="/add" className="text-blue-600">adding one</Link>?</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {books.map(b => <BookCard key={b._id} book={b} />)}
            </div>
          )}
          <div className="flex items-center justify-between mt-6">
            <button disabled={page<=1} onClick={()=>fetchBooks(page-1)} className="px-3 py-1 border rounded">Previous</button>
            <div>Page {page} of {totalPages}</div>
            <button disabled={page>=totalPages} onClick={()=>fetchBooks(page+1)} className="px-3 py-1 border rounded">Next</button>
          </div>
        </>
      )}
    </div>
  );
}
