import React from 'react';
import { Link } from 'react-router-dom';

const TrendingNowDetails = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className={`
        flex-shrink-0 
        w-[200px] h-[280px] 
        sm:w-[150px] sm:h-[200px] 
        md:w-[180px] md:h-[250px] 
        lg:w-[240px] lg:h-[320px]
      `}
    >
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg"
      />
    </Link>
  );
};

export default TrendingNowDetails;
