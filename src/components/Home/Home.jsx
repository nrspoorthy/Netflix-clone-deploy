import React, { Fragment, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import TrendingNow from './TrendingNow/TrendingNow';
import Originals from './Originals/Originals';
import Popular from '../Popular/Popular';
import TopRated from './TopRated/TopRated';
import Footer from '../Footer/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Fragment>
      {activeTab === 'home' && (
        <div>
          {/* Hero Section */}
          <div
            className="h-[80vh] bg-cover bg-center relative"
            style={{
              backgroundImage:
                'url("https://ik.imagekit.io/ir3rmu42h/Image.png?updatedAt=1752639047125")',
            }}
          >
            <Navbar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
            />

            <div className="text-white w-full mt-[7%] ml-[6%]">
              <h1 className="font-roboto font-ssemibold text-[clamp(24px,5vw,56px)]">
                Super Man
              </h1>
              <p className="max-w-[600px] font-roboto font-normal mt-2 text-[clamp(14px,2vw,18px)]">
                Superman is a fictional superhero who first appeared in American comic books published by DC Comics.
              </p>
              <button className="bg-white text-black px-4 py-2 mt-4 rounded-md text-sm font-medium">
                Play
              </button>
            </div>
          </div>

          {/* Movie Sections */}
          <div className="bg-black pb-16">
            <TrendingNow />
            <TopRated />
            <Originals />
            <Footer />
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
