import React, { Fragment, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PopularDetails from './populardetails';
import Navbar from '../Navbar/Navbar';
import './Popular.css';
import Footer from '../Footer/Footer';

const Popular = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [showSearch, setShowSearch] = useState(false); 
  const [popularimg, setPopularimg] = useState([]);
  const [loading,setLoading] = useState(true)

useEffect(() => {
  const fetchPopular = async () => {
    const jwtToken = Cookies.get("jwt_token");

    try {
      const response = await fetch("https://apis.ccbp.in/movies-app/popular-movies", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPopularimg(data.results);
      } else {
        const errorText = await response.text();
        console.error("API Error:", errorText);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }finally{
      setLoading(false)
    }
  };

  fetchPopular();
}, []);
if (loading) {
    return <p className="loading-text">Loading...</p>;
}


  return (
    <Fragment>
    <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
    />
    <div className="popular-container">
      {popularimg.map(movie => (
        <PopularDetails key = {movie.id} movie={movie}/>
      ))

      }
    </div>
    <Footer/>
    </Fragment>
  );
};

export default Popular;