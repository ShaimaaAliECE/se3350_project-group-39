import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './Login.css';


function Login(props) {
    
    const [loginForm, setloginForm] = useState(
        {
            email: "",
            password: ""
        }
    )

    const navigate = useNavigate();

    function logMeIn(event) {
        axios({
            method: 'POST',
            url: '/token',
            data:   {
                email: loginForm.email,
                password: loginForm.password
            }
        }).then((response) =>   {
            props.setToken(response.data.access_token)
            navigate('/MenuPage')
        }).catch((error) =>    {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
                } 
        })

        setloginForm(({
            email: "",
            password: ""}))
    
        event.preventDefault()
    }

    function handleChange(event)    {
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )
    }


    return (
        <div>  
            <h1>Know Your Algo</h1>
            <div className = "loginframe">
            <h2>Login</h2>
            <div>
                <form className="login">
                    <div>
                    <input onChange={handleChange} 
                            type="email"
                            text={loginForm.email} 
                            name="email" 
                            placeholder="Email" 
                            value={loginForm.email} />
                    </div>
                    <div>
                    <input onChange={handleChange} 
                            type="password"
                            text={loginForm.password} 
                            name="password" 
                            placeholder="Password" 
                            value={loginForm.password} />
                    </div> 
           
                <button onClick={logMeIn}>Submit</button>
             
                </form>
            </div>
            </div>
        </div>
      );
  
}

export default Login;
