import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PopularDetails = ({ movie }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="flex justify-center relative w-full">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-900 rounded-lg">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={movie.poster_path}
          alt={movie.title}
          className={`w-full h-auto rounded-lg object-cover ${loading ? 'invisible' : 'visible'}`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </Link>
  );
};

export default PopularDetails;
