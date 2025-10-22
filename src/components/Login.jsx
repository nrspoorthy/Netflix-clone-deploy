import React, { useState, Fragment } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const onChangeInput = (event) => setInputValue(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    localStorage.setItem("username", inputValue);
    localStorage.setItem("password", password);
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (msg) => {
    setShowSubmitError(true);
    setErrorMsg(msg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username: inputValue, password };
    const options = { method: "POST", body: JSON.stringify(userDetails) };

    const response = await fetch("https://apis.ccbp.in/login", options);
    const data = await response.json();

    if (response.ok) onSubmitSuccess(data.jwt_token);
    else onSubmitFailure(data.error_msg);
  };

  return (
    <Fragment>
      <div
        className="relative flex items-center justify-center h-screen w-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/ir3rmu42h/8ccaf66f19edc15e3aa6b6a1301fd6667bf2509e.jpg?updatedAt=1752585048647')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-[1]"></div>

        {/* Logo */}
        <img
          src="https://ik.imagekit.io/ir3rmu42h/Group%207399.png?updatedAt=1752587169253"
          alt="Logo"
          className="absolute top-8 left-8 h-12 sm:h-14 md:h-16 z-[2]"
        />

        {/* Login Card */}
        <form
          onSubmit={submitForm}
          className="relative z-[2] flex flex-col bg-black/40 text-white rounded-[10px] p-6 sm:p-8 w-[85vw] sm:w-[60vw] md:w-[30vw]"
        >
          <h1 className="text-center text-2xl sm:text-3xl font-roboto mb-6 p-[2px]">
            Login
          </h1>

          <label className="my-[10px] text-[14px] font-roboto">USERNAME</label>
          <input
            value={inputValue}
            onChange={onChangeInput}
            type="text"
            className="bg-gray-500 text-black mb-[20px] p-[10px] w-full rounded-[5px] font-roboto focus:outline-none"
          />

          <label className="my-[10px] text-[14px] font-roboto">PASSWORD</label>
          <input
            value={password}
            onChange={onChangePassword}
            type="password"
            className="bg-gray-500 text-black mb-[20px] p-[10px] w-full rounded-[5px] font-roboto focus:outline-none"
          />

          <button
            type="submit"
            className="bg-[#e50914] text-white w-full py-[12px] rounded-[7px] border-none text-[16px] cursor-pointer font-roboto hover:bg-red-700 transition"
          >
            Login
          </button>

          {showSubmitError && (
            <p className="text-[#e50914] mt-2 text-sm">*{errorMsg}</p>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default LoginPage;
