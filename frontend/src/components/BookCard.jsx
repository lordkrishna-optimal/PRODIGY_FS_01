import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({book}){
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-600">by {book.author}</p>
      <div className="mt-2">
        <span className="text-yellow-500">★</span> {book.rating?.avg ? book.rating.avg.toFixed(1) : '0.0'} ({book.rating?.count || 0})
      </div>
      <div className="mt-4">
        <Link to={`/books/${book._id}`} className="px-3 py-1 bg-blue-600 text-white rounded">View Details</Link>
      </div>
    </div>
  );
}
