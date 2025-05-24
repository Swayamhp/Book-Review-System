import React from 'react'
import { Link } from 'react-router-dom';

const Review = ({ reviews }) => {
  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((rev, index) => (
          <div key={index} className="mb-4 border-b pb-3">
            <div className="flex items-center gap-3 mb-2">
              {rev.user?.avatar && (
                <Link to={`/users/${rev.user._id}`}>
                <img
                  src={rev.user.avatar}
                  alt={rev.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                </Link>
              )}                <Link to={`/users/${rev.user._id}`}>

              <span className="font-semibold text-gray-800">{rev.user?.name}</span>
              </Link>
               <p className="text-yellow-500 text-sm">
              {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
            </p>
            </div>
            <p className=" text-left text-gray-700 mt-1">{rev.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};


export default Review
