import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function SearchResults() {
  const { searchText } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const jwtToken = Cookies.get("jwt_token");
      try {
        const response = await fetch(
          `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`,
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          console.error("Failed to fetch search results:", response.status);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchText]);

  if (loading) {
    return (
      <div className="bg-black/95 flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <h1 className="text-white text-xl mt-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/95 min-h-screen">
       <Navbar
                   
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                  />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="flex flex-col items-center text-center text-white hover:scale-105 transform transition duration-300"
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="
                  w-[90%] sm:w-full 
                  h-64 sm:h-80 md:h-96 lg:h-[28rem] 
                  rounded-lg object-cover
                "
              />
              <p className="mt-2 text-sm sm:text-xs md:text-sm lg:text-base font-medium">
                {movie.title}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-300 col-span-full mt-20">
            No results found for "{searchText}"
          </p>
        )}
      </div>
    </div>
  );
}
