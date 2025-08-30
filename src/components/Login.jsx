import { useState } from "react"
import { Fragment } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
import React from "react"

import './Login1.css';

const LoginPage = () => {
  console.log("hello")
    
    const [inputValue, setInputValue] = useState('')
    const [password, setPassword] = useState('')
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate()
    const onChangeInput = (event) => {
        setInputValue(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitSuccess = jwtToken => {
    console.log("Received Token:", jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})

     localStorage.setItem("username", inputValue); 
     localStorage.setItem("password", password); 
    navigate('/', { replace: true })
  }
  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

    const submitForm = async (event) => {
        event.preventDefault()
       const userDetails = { username: inputValue, password }
      

const options = {
  method: 'POST',
  body: JSON.stringify(userDetails),
}

const response = await fetch('https://apis.ccbp.in/login', options);
       const data = await response.json()
        if(response.ok == true){
            

            onSubmitSuccess(data.jwt_token)

        }
        else{
            onSubmitFailure(data.error_msg)
        }

    }

    // const jwtToken = Cookies.get('jwt_token')
    // if(jwtToken !== undefined){
    //     return <Navigate to="/"/>
    // }
  return (
    <Fragment>
      <div className='login-bg'>
        <div className='over-lay'></div>
        <img
          src="https://ik.imagekit.io/ir3rmu42h/Group%207399.png?updatedAt=1752587169253"
          className='logo'
          alt="Logo"
        />
        <div className="card-align">
          <form className='login-card' onSubmit={submitForm}>
            <h1 className='h1'>Login</h1><br />
            <div>
              <label className='center'>USERNAME</label><br />
              <input
                value={inputValue}
                onChange={onChangeInput}
                type='text'
                className="input-name"
              /><br />
              <label className='center'>PASSWORD</label><br />
              <input
                value={password}
                onChange={onChangePassword}
                type='password'
                className="input-name"
              />
            </div>
            <button type='submit' className='login-btn'>Login</button>
            {showSubmitError && <p className='errormsg'>*{errorMsg}</p>}
          </form>
        </div>
      </div>
    </Fragment>
  );}

export default LoginPage