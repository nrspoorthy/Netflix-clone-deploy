import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Navbar({ activeTab, setActiveTab, showSearch, setShowSearch }) {
  const [searchText, setsearchText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const overlayRef = useRef();
  const mobileMenuRef = useRef();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      navigate(`/search/${searchText}`);
      setShowSearch(false);
      setsearchText('');
    }
  };

  const handleLinkClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  // Close search if clicked outside
  const handleClickOutside = (e) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target)) {
      setShowSearch(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (showSearch || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch, mobileMenuOpen]);

  return (
    <>
      <nav className="bg-[rgba(0,0,0,0.6)] h-[10vh] w-full flex items-center px-[5%] z-40 relative">
        <div className="flex items-center justify-between w-full text-white">
          <Link to="/">
            <img
              src="https://ik.imagekit.io/ir3rmu42h/Group%207399.png?updatedAt=1752587169253"
              className="h-10 mt-2"
              alt="logo"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className={`${activeTab === 'home' ? 'text-white font-bold' : 'text-white'} cursor-pointer`}
              onClick={() => handleLinkClick('home')}
            >
              Home
            </Link>
            <Link
              to="/Popular"
              className={`${activeTab === 'popular' ? 'text-white font-bold' : 'text-white'} cursor-pointer`}
              onClick={() => handleLinkClick('popular')}
            >
              Popular
            </Link>

            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowSearch(true)}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>

            {/* Profile */}
            <Link to="/account">
              <img
                src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPhn5RuPOvN48hohRKcO1fBlFPNaBB1i8p6mAV3aSpXof9pOls"
                className="h-10 w-10 rounded-full object-cover"
                alt="profile"
              />
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-3">
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => setShowSearch(true)}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>

            {/* Hamburger Button: only show when menu is closed */}
            {!mobileMenuOpen && (
              <button onClick={() => setMobileMenuOpen(true)} aria-label="Toggle menu">
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Options */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden bg-[rgba(0,0,0,0.9)] mt-9 w-full px-5 py-3 flex flex-col gap-3 text-white"
          >
            <Link
              to="/"
              className={`${activeTab === 'home' ? 'font-bold' : ''}`}
              onClick={() => handleLinkClick('home')}
            >
              Home
            </Link>
            <Link
              to="/Popular"
              className={`${activeTab === 'popular' ? 'font-bold' : ''}`}
              onClick={() => handleLinkClick('popular')}
            >
              Popular
            </Link>
            <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
              Account
            </Link>
          </div>
        )}

        {/* Search Overlay with AOS */}
        {showSearch && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16 px-4" data-aos="fade-down">
            <div ref={overlayRef} className="w-full max-w-md md:max-w-lg relative">
              <input
                type="text"
                placeholder="Search Movie"
                className="w-11/12 md:w-full p-3 rounded-md text-black text-lg focus:outline-none bg-white shadow-lg"
                value={searchText}
                onChange={(e) => setsearchText(e.target.value)}
                onKeyDown={handleSearch}
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
