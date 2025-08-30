import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './SearchResults.css';
import { Link } from 'react-router-dom';


export default function SearchResults() {
    const { searchText } = useParams()
    const [movies,setmovies] = useState([])
    const [loading,setloading] = useState(true)

 useEffect(() => {
    const fetchSearchResults = async () => {
      const jwtToken = Cookies.get('jwt_token');
      try {
        const response = await fetch(`https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setmovies(data.results);
        } else {
          console.error('Failed to fetch trending movies:', response.status);
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }finally{
        setloading(false)
      }
    };


    fetchSearchResults();
  }, []);
  if (loading){
    <h1>Loading...</h1>
  }

  return (
    <div className="bgblack">
  <Navbar />
  <div className="movies-grid">
    {movies.length > 0 ? (
      movies.map(movie => (
        <Link key={movie.id} to={`/movies/${movie.id}`} className="movie-card">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="movie-poster"
          />
          <p className="p">{movie.title}</p>
        </Link>
      ))
    ) : (
      <p className="p">No results found for "{searchText}"</p>
    )}
  </div>
</div>

  )
}
