import React, { Fragment, useState } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import TrendingNow from './TrendingNow/TrendingNow';
import Originals from './Originals/Originals';
import Popular from '../Popular/Popular';
import TopRated from './TopRated/TopRated'
import Footer from '../Footer/Footer';
export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Fragment>
      {activeTab === 'home' && (
        <div>
          <div className='bg'>
            <Navbar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
            />

            <div className='navheadings'>
              <h1 className='superman'>Super Man</h1>
              <p className='paragraph'>
                Superman is a fictional superhero who first appeared in American comic books published by DC Comics.
              </p>
              <button className='navbtn'>Play</button>
            </div>
          </div>

          <div className='movies'>
            <TrendingNow />
            <TopRated />
            <Originals />

            {/* Footer Icons */}
            <Footer/>
          </div>
        </div>
      )}

      {activeTab === 'popular' && (
        <div>
          <Popular />  
        </div>
      )} 
    </Fragment>
  );
}
