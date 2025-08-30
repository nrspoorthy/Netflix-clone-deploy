import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './Originals.css';

export default function Originals() {
  const [originals, setOriginals] = useState([]);
  const scrollRef = useRef(null);
  const scrollAmount = 4 * 220;

  useEffect(() => {
    const fetchOriginals = async () => {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch("https://apis.ccbp.in/movies-app/originals", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOriginals(data.results);
      } else {
        console.log("Failed to fetch originals");
      }
    };

    fetchOriginals();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= scrollAmount;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += scrollAmount;
  };

  return (
    <div>
      <h1 className='trendig'>Originals</h1>
      <div className="trending-section">
        <div className="arrow left" onClick={scrollLeft}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="arrow-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 19.5-7.5-7.5 7.5-7.5" />
          </svg>
        </div>

        <div className="trendingimgs" ref={scrollRef}>
          {originals.map(movie => (
            
            <Link key={movie.id} to={`/movies/${movie.id}`} className="movie-card">
              <div className="trending-img-wrapper">
                <img src={movie.poster_path} alt={movie.title} className="trendingimg" />
              </div>
            </Link>
          ))}
        </div>

        <div className="arrow right" onClick={scrollRight}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="arrow-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
