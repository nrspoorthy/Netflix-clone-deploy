import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import TrendingNowDetails from './TrendingNowDetails';

const TrendingNow = () => {
  const [trendingNow, setTrendingNow] = useState([]);
  const scrollRef = useRef(null);
  const scrollAmount = 4 * 220;

  useEffect(() => {
    const fetchTrendingNow = async () => {
      const jwtToken = Cookies.get('jwt_token');
      try {
        const response = await fetch('https://apis.ccbp.in/movies-app/trending-movies', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTrendingNow(data.results);
        } else {
          console.error('Failed to fetch trending movies:', response.status);
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingNow();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft -= scrollAmount;
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft += scrollAmount;
  };

  return (
    <div className="bg-black pb-10">
      <h1 className="text-white text-[20px] pt-8 ml-[4%] font-roboto sm:text-[16px] sm:ml-[2%]">
        Trending Now
      </h1>

      <div className="relative mt-5 mx-5 flex items-center overflow-hidden">
        {/* Left Arrow */}
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 cursor-pointer z-10"
          onClick={scrollLeft}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 19.5-7.5-7.5 7.5-7.5" />
          </svg>
        </div>

        {/* Image List */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden -mr-2"
        >
          {trendingNow.map(movie => (
            <TrendingNowDetails key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right Arrow */}
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 cursor-pointer z-10"
          onClick={scrollRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TrendingNow;
