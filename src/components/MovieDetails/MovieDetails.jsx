import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../Navbar/Navbar";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const jwtToken = Cookies.get("jwt_token");
      try {
        const response = await fetch(`https://apis.ccbp.in/movies-app/movies/${id}`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          const formattedData = {
            title: data.movie_details.title,
            poster_path: data.movie_details.poster_path,
            backdrop_path: data.movie_details.backdrop_path,
            overview: data.movie_details.overview,
            runtime: data.movie_details.runtime,
            adult: data.movie_details.adult,
            similar_movies: data.movie_details.similar_movies,
            genres: data.movie_details.genres,
            audio: data.movie_details.spoken_languages,
            rating_count: data.movie_details.vote_count,
            rating_average: data.movie_details.vote_average,
            budget: data.movie_details.budget,
            release_date: data.movie_details.release_date,
          };
          setMovie(formattedData);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-300 text-lg mt-12">Loading...</p>;
  }

  return (
    <div className="bg-[#121212] text-white font-sans min-h-screen">
      <Navbar />

      {/* 🎥 Banner Section */}
      <div className="relative flex items-end overflow-hidden h-[60vh] md:h-[70vh] lg:h-[75vh]">
        {/* ✅ Image with object-top prevents top cut */}
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/60 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 px-[5vw] pb-[5vw] max-w-[900px]">
          <h1 className="font-[Bebas_Neue] text-white font-normal leading-tight text-[clamp(1.8rem,4vw,3.5rem)] drop-shadow-[0_4px_15px_rgba(0,0,0,0.85)]">
            {movie.title}
          </h1>

          <p className="mt-2 text-[clamp(0.9rem,1.5vw,1.2rem)] opacity-90">
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m &nbsp;•&nbsp;
            {movie.adult ? "A" : "U/A"} &nbsp;•&nbsp;
            {movie.release_date?.split("-")[0]}
          </p>

          <p className="mb-5 mt-3 leading-relaxed text-[clamp(0.85rem,1.2vw,1rem)] max-w-[800px] hidden sm:block">
            {movie.overview}
          </p>

          <button className="bg-gradient-to-r from-[#e50914] to-[#f6121d] text-white px-7 py-3 font-bold text-[clamp(0.9rem,1vw,1rem)] rounded-md transition duration-300 ease-in-out hover:from-[#f6121d] hover:to-[#ff1e26] hover:scale-105">
            Play
          </button>
        </div>
      </div>

      {/* 📝 Metadata Section — always 2 columns (2x2 grid) */}
      <div className="grid grid-cols-2 gap-5 p-[5vw] bg-[#1f1f1f]">
        <div className="bg-[#292929] p-4 rounded-lg transition-transform duration-300 hover:-translate-y-1">
          <h4 className="text-[#ccc] text-[clamp(0.9rem,1vw,1.1rem)] mb-1">Genres</h4>
          <p className="text-sm whitespace-pre-line">
            {movie.genres?.map((g) => g.name).join("\n")}
          </p>
        </div>

        <div className="bg-[#292929] p-4 rounded-lg transition-transform duration-300 hover:-translate-y-1">
          <h4 className="text-[#ccc] text-[clamp(0.9rem,1vw,1.1rem)] mb-1">Audio Available</h4>
          <p className="text-sm whitespace-pre-line">
            {movie.audio?.map((a) => a.english_name).join("\n")}
          </p>
        </div>

        <div className="bg-[#292929] p-4 rounded-lg transition-transform duration-300 hover:-translate-y-1">
          <h4 className="text-[#ccc] text-[clamp(0.9rem,1vw,1.1rem)] mb-1">Ratings</h4>
          <p className="text-sm">Count: {movie.rating_count}</p>
          <p className="text-sm">Average: {movie.rating_average}</p>
        </div>

        <div className="bg-[#292929] p-4 rounded-lg transition-transform duration-300 hover:-translate-y-1">
          <h4 className="text-[#ccc] text-[clamp(0.9rem,1vw,1.1rem)] mb-1">Budget</h4>
          <p className="text-sm mb-2">{movie.budget} Crores</p>
          <h4 className="text-[#ccc] text-[clamp(0.9rem,1vw,1.1rem)] mb-1">Release Date</h4>
          <p className="text-sm">
            {new Date(movie.release_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* 🎞 Similar Movies */}
      <h2 className="mt-8 mb-4 text-[clamp(1.3rem,2vw,1.8rem)] px-[5vw] font-semibold">
        More like this
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-[5vw] pb-12">
        {movie.similar_movies?.map((similar) => (
          <Link to={`/movies/${similar.id}`} key={similar.id}>
            <img
              src={similar.poster_path}
              alt={similar.title}
              className="w-full rounded-lg transition-transform duration-300 hover:scale-[1.08] hover:shadow-[0_6px_18px_rgba(0,0,0,0.5)] object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
