import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar';
import './MovieDetails.css';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const jwtToken = Cookies.get('jwt_token');
      try {
        const response = await fetch(`https://apis.ccbp.in/movies-app/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
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
        console.error('Network error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="movie-details-wrapper">
      <Navbar />

      {/* Banner */}
      <div
        className="movie-banner"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      >
        <div className="movie-banner-content">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-meta">
            {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m &nbsp;
            {movie.adult ? 'A' : 'U/A'} &nbsp;
            {movie.release_date?.split('-')[0]}
          </p>
          <p className="movie-overview">{movie.overview}</p>
          <button className="movie-play-btn">Play</button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="movie-metadata">
        <div>
          <h4>Genres</h4>
          <p>{movie.genres?.map((g) => g.name).join('\n')}</p>
        </div>
        <div>
          <h4>Audio Available</h4>
          <p>{movie.audio?.map((a) => a.english_name).join('\n')}</p>
        </div>
        <div>
          <h4>Rating Count</h4>
          <p>{movie.rating_count}</p>
          <h4>Rating Average</h4>
          <p>{movie.rating_average}</p>
        </div>
        <div>
          <h4>Budget</h4>
          <p>{movie.budget} Crores</p>
          <h4>Release Date</h4>
          <p>
            {new Date(movie.release_date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Similar Movies */}
      <h2 className="more-like-this-heading">More like this</h2>
      <div className="similar-movies-grid">
        {movie.similar_movies?.map((similar) => (
          <Link to={`/movies/${similar.id}`} key={similar.id}>
            <img
              src={similar.poster_path}
              alt={similar.title}
              className="similar-movie-img"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
