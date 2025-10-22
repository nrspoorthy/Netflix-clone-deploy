import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function TopRated() {
  const [topRated, setTopRated] = useState([]);
  const scrollRef = useRef(null);
  const scrollAmount = 4 * 220;

  useEffect(() => {
    const fetchTopRated = async () => {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch('https://apis.ccbp.in/movies-app/top-rated-movies', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTopRated(data.results);
      } else {
        console.error('Failed to fetch top rated movies:', response.status);
      }
    };

    fetchTopRated();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= scrollAmount;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += scrollAmount;
  };

  return (
    <div className="bg-black pb-10">
      <h1 className="text-white text-2xl font-bold ml-5 pt-8">Top Rated</h1>

      <div className="relative mx-5 my-4 flex items-center">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full z-10 hover:scale-110 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 19.5-7.5-7.5 7.5-7.5" />
          </svg>
        </button>

        {/* Movies Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 scroll-smooth w-full px-8 py-2 scrollbar-hide"
        >
          {topRated.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="
                flex-shrink-0 
                w-[200px] h-[280px] 
                sm:w-[150px] sm:h-[200px] 
                md:w-[180px] md:h-[250px] 
                lg:w-[240px] lg:h-[320px]
              "
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full z-10 hover:scale-110 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
