import './App.css'
import React from 'react';
import LoginPage from './components/Login.jsx'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home/Home.jsx';
import MovieDetails from './components/MovieDetails/MovieDetails.jsx';
import Profile from './components/Profile/Profile.jsx';
import Popular from './components/Popular/Popular.jsx';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path = '/popular' element={<ProtectedRoute><Popular /></ProtectedRoute>}></Route>
        <Route path = '/movies/:id' element = {<ProtectedRoute><MovieDetails/></ProtectedRoute>}></Route>
        <Route path='/account' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path="/search/:searchText" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}
export default App;
