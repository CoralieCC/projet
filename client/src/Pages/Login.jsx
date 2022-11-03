import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { login } from "../requests/user.js";
import '../styles/login.css'

export const Login = () => {
    const [token, setToken] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState();

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    const submitForm = async (event) => {
        event.preventDefault();
        const response = await login(email, password);
        if (response.status === 200) {
            localStorage.setItem("token", response.data);
            window.location.href = "/mes-avis";
        } else {
            setErrors("Adresse email / mot de passe non valide");
        }
    };

    return (
        <div className="register">
        <h1>Se connecter</h1>
        {!token ? 
            <>
            {errors && 
                <p className="error">{errors}</p>
            }
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="email"><span>Email</span></label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password"><span>Mot de passe</span></label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="black">Se connecter</button>
            </form>
            </>
            :
            <Navigate to='/home'/>
        }
        </div>
    );
};
