import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './trendingnow.css';
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
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
   
    <div className="movies">
      <h1 className='trendig'>Trending Now</h1>
      <div className='trending-section'>
        
        <div className="arrow left" onClick={scrollLeft}>
          {/* Left Arrow */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="arrow-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 19.5-7.5-7.5 7.5-7.5" />
          </svg>
        </div>

        <div className='trendingimgs' ref={scrollRef}>
          {trendingNow.map(movie => (
              <TrendingNowDetails key={movie.id} movie={movie} />
          ))}
        </div>

        <div className="arrow right" onClick={scrollRight}>
          {/* Right Arrow */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="arrow-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TrendingNow;
