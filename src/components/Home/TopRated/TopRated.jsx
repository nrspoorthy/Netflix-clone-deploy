import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function TopRated() {
  const [topRated, setTopRated] = useState([]);
  const scrollRef = useRef(null);
  const scrollAmount = 4 * 180;

  useEffect(() => {
    const fetchTopRated = async () => {
      const jwtToken = Cookies.get("jwt_token");
      const response = await fetch("https://apis.ccbp.in/movies-app/top-rated-movies", {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTopRated(data.results);
      } else {
        console.error("Failed to fetch top-rated movies");
      }
    };

    fetchTopRated();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft -= scrollAmount;
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft += scrollAmount;
  };

  return (
    <div className="bg-black pb-10">
      <h1 className="text-lg font-semibold text-white ml-8 pt-8 mb-4">
        Top Rated
      </h1>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-20 bg-black/50 rounded-full hover:scale-110 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 19.5-7.5-7.5 7.5-7.5"
            />
          </svg>
        </button>

        {/* Movie List */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-auto gap-4 px-8 py-2 scroll-smooth"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE
          }}
        >
          {topRated.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="flex-shrink-0 min-w-[176px] h-[260px]" // fixed width/height
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 z-20 bg-black/50 rounded-full hover:scale-110 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
