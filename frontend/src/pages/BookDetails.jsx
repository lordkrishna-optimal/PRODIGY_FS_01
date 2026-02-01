import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import RatingStars from '../components/RatingStars';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AuthContext } from '../contexts/AuthContext';

export default function BookDetails(){
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ fetch(); }, [id]);

  const postReview = async () => {
    try {
      await API.post('/reviews', { bookId: id, rating, reviewText: text });
      setText('');
      setRating(5);
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Add review failed');
    }
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm('Delete review?')) return;
    try {
      await API.delete(`/reviews/${reviewId}`);
      fetch();
    } catch (err) { alert('Delete failed'); }
  };

  // build rating distribution from reviews
  const distribution = React.useMemo(() => {
    if (!book?.reviews) return [];
    const counts = [0,0,0,0,0];
    book.reviews.forEach(r => counts[r.rating - 1]++);
    return [5,4,3,2,1].map((v, i) => ({ name: `${v} ★`, value: counts[5 - v] || counts[4 - i] || counts[0] })).reverse(); // safe mapping
  }, [book]);

  return (
    <div>
      {loading ? <div className="skeleton h-36 rounded" /> : book && (
        <>
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{book.title}</h2>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <div className="mt-2">Average: <strong>{book.avgRating ? book.avgRating.toFixed(1) : '0.0'}</strong> ({book.reviewCount || 0})</div>
              </div>
              <div className="w-48">
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={[
                    { name:'5 ★', value: book.reviews?.filter(r=>r.rating===5).length || 0 },
                    { name:'4 ★', value: book.reviews?.filter(r=>r.rating===4).length || 0 },
                    { name:'3 ★', value: book.reviews?.filter(r=>r.rating===3).length || 0 },
                    { name:'2 ★', value: book.reviews?.filter(r=>r.rating===2).length || 0 },
                    { name:'1 ★', value: book.reviews?.filter(r=>r.rating===1).length || 0 },
                  ].reverse()}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{book.description}</p>

            <hr className="my-4" />
            <h3 className="font-semibold mb-2">Reviews</h3>

            {/* Add a review */}
            {user ? (
              <div className="bg-gray-50 p-3 rounded mb-4">
                <div className="flex items-center gap-4">
                  <RatingStars value={rating} onChange={setRating} />
                  <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Write your review" className="flex-1 p-2 border rounded" />
                </div>
                <div className="mt-2">
                  <button onClick={postReview} className="px-3 py-1 bg-blue-600 text-white rounded">Post Review</button>
                </div>
              </div>
            ) : (
              <p><Link to="/login" className="text-blue-600">Login</Link> to add a review.</p>
            )}

            {book.reviews?.length ? book.reviews.map(r => (
              <div key={r._id} className="border-t py-3">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{r.userId?.name || 'User'}</div>
                    <div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                    {user?.id === r.userId?._id || user?._id === r.userId?._id ? (
                      <>
                        <button onClick={()=>deleteReview(r._id)} className="text-red-600">Delete</button>
                      </>
                    ) : null}
                  </div>
                </div>
                <p className="mt-2">{r.reviewText}</p>
              </div>
            )) : <p className="text-gray-500">No reviews yet.</p>}
          </div>
        </>
      )}
    </div>
  );
}
