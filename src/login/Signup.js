import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Signup(props) {

    const [signupForm, setsignupForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function signUp(event) {
        axios({
            method: "POST",
            url: "/Signup",
            data: {
                email: signupForm.email,
                password: signupForm.password,
            },
        })
            .then((response) => {
                props.setToken(response.data.access_token);
                navigate("/");
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

        setsignupForm({
            email: "",
            password: "",
        });

        event.preventDefault();
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setsignupForm((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }

return (
    <div>
        <h1 id="title">Know Your Algo</h1>

        <div className="loginFrame">
            <p className="sign" align="center">
                Create an Account
            </p>

            <form className="login">
                <input
                    className="un"
                    onChange={handleChange}
                    type="email"
                    text={signupForm.email}
                    name="email"
                    placeholder="Email"
                    value={signupForm.email}
                    align="center"
                />

                <input
                    className="pass"
                    onChange={handleChange}
                    type="password"
                    text={signupForm.password}
                    name="password"
                    placeholder="Password"
                    value={signupForm.password}
                    align="center"
                />

                <div className="submit-btn">
                    <button className="btn" onClick={signUp}>
                        Sign Up
                    </button>
                </div>

                <div className="suliRedirect">
                    <a href="/">Go back</a>
                </div>
            </form>
        </div>
    </div>
);
}

export default Signup;
