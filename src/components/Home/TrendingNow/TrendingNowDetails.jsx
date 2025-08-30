import React from 'react'
import { Link } from 'react-router-dom'


const TrendingNowDetails = ({ movie }) => {
  console.log(movie.id)
  return (
   
     
      
        <Link key={movie.id} to={`/movies/${movie.id}`} className="movie-card">
        <div className="trending-img-wrapper">
          <img src={movie.poster_path} alt={movie.title} className='trendingimg' />
        </div>
      </Link>
  )
}

export default TrendingNowDetails
