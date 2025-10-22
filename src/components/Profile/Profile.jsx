import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Profile() {
  const email = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="ml-[5%] mt-[5%] mr-[6%]">
        <h1 className="text-3xl font-bold font-roboto">Account</h1>
        <hr className="text-gray-300 py-2 my-2 pr-5" />

        <div className="flex gap-5 pl-5 ml-5">
          <h1 className="text-gray-500">Member ship</h1>
          <h1>rahul@gmail.com</h1>
        </div>

        <h1 className="ml-[11%] text-gray-500">Password: **********</h1>
        <hr className="text-gray-300 py-2 my-2" />

        <div className="flex gap-5 pl-5 ml-5 items-center">
          <h1 className="text-gray-500">Plan details</h1>
          <p>Premium</p>
          <button className="border border-black px-1 text-sm">Ultra HD</button>
        </div>
        <hr className="text-gray-300 py-2 my-2" />

        <div className="text-center my-3">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
