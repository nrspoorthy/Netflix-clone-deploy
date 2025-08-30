import React from 'react';
import { Link } from 'react-router-dom';

const PopularDetails = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className='flex'>
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="popular-img"
        />
      </div>
    </Link>
  );
};

export default PopularDetails;
