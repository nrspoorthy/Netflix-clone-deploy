import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.css"
export default function Navbar({ activeTab, setActiveTab, showSearch, setShowSearch }) {
  const [searchText, setsearchText] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      navigate(`/search/${searchText}`)
      setShowSearch(false)
      setsearchText('')
    }
  }

  return (
    <div>
      <nav className='navbar'>
        <div className='completenav'>
          {/* Left Logo */}
          <img
            src="https://ik.imagekit.io/ir3rmu42h/Group%207399.png?updatedAt=1752587169253"
            className='logo'
            alt="logo"
          />

          {/* Right side */}
          <div className='flex1'>
            <Link
              to="/"
              className={activeTab === 'home' ? 'active-tab' : ''}
              onClick={() => setActiveTab('home')}
            >
              Home
            </Link>
            <Link
              to="/Popular"
              className={activeTab === 'popular' ? 'active-tab' : ''}
              onClick={() => setActiveTab('popular')}
            >
              Popular
            </Link>

            {/* Search */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 icon"
              onClick={() => setShowSearch(prev => !prev)}
              style={{ cursor: 'pointer' }}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>

            {showSearch && (
              <input
                type="text"
                placeholder="Search Movie"
                className="search-input"
                value={searchText}
                onChange={(e) => setsearchText(e.target.value)}
                onKeyDown={handleSearch}
              />
            )}

            {/* Profile */}
            <Link to="/account">
              <img
                src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPhn5RuPOvN48hohRKcO1fBlFPNaBB1i8p6mAV3aSpXof9pOls"
                className="profileicon"
                alt="profile"
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
