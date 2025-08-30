import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Profile() {
    const email = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    const navigate = useNavigate()

    const handleLogout = () => {
     Cookies.remove('jwt_token')
     navigate('/login') 
    }
  return (
    <div>
      <Navbar/>
      <div>
      <div className='complete-margin'>
      <h1 className='mainh1'>Account</h1>
      <hr/>

      <div className='membershipflex'>
      <h1 className='plan'>Member ship</h1>
      
      <h1>rahul@gmail.com</h1>
    </div>

        <h1 className='password'>Password: **********</h1>
    <hr/>

    <div className='membershipflex'>
    <h1 className='plan'>Plan details</h1>
    <p>Premium</p>
    <button className='Hd'>Ultra HD</button>
    </div>
    <hr/>
    </div>
  <div className='btnflex'>
  <button className='button' onClick={handleLogout}>Logout</button>
</div>
</div>


    </div>
  )
}
