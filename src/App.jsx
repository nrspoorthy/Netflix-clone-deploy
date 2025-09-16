import './App.css'
import React from 'react';
import LoginPage from './components/Login.jsx'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home/Home.jsx';
import MovieDetails from './components/MovieDetails/MovieDetails.jsx';
import Profile from './components/Profile/Profile.jsx';
import Popular from './components/Popular/Popular.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path = '/popular' element={<Popular />}></Route>
        <Route path = '/movies/:id' element = {<MovieDetails/>}></Route>
        <Route path='/account' element={<Profile/>}></Route>
        <Route path="/search/:searchText" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}
export default App;
