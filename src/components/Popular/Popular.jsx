import React, { Fragment, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import PopularDetails from './PopularDetails';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Popular = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [showSearch, setShowSearch] = useState(false);
  const [popularimg, setPopularimg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 6 : 10);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPopular = async () => {
      const jwtToken = Cookies.get("jwt_token");
      try {
        const response = await fetch("https://apis.ccbp.in/movies-app/popular-movies", {
          method: "GET",
          headers: { Authorization: `Bearer ${jwtToken}` },
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
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  if (loading) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-4 border-blue-500 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-gray-700 border-t-transparent animate-spin delay-150"></div>
      </div>
    </div>
  );
}


  const totalPages = Math.ceil(popularimg.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = popularimg.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Fragment>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

      {/* Movies Grid */}
      <div className="bg-black min-h-[calc(100vh_-_150px)] px-4 py-6 grid gap-2 sm:gap-3 md:gap-4
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {currentItems.map(movie => (
          <PopularDetails key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 text-white bg-black py-4 sticky bottom-0 z-50">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-1 rounded ${
              currentPage === number
                ? "bg-gray-900 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      <Footer />
    </Fragment>
  );
};

export default Popular;
