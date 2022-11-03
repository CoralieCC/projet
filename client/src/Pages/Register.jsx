import React from "react";
import { useState } from "react";
import { register } from "../requests/user.js";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("")
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState("");


    const submitForm = async (event) => {
        event.preventDefault();
        const response = await register(email, username, password, confirmPassword);

        if (response.status === 200) {
        setErrors("");
        setMessage(response.message);
        } else {
        setErrors(response);
        }
    };

    return (
        <div className="register">
            <h1>Créer un compte</h1>
            <>
            {message && 
                <p className="success">{message}</p>
            }
            {errors && 
                <p className="error">{errors}</p>
            }
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="email"><span>Email</span></label>
                <input
                    type="email"
                    name="email"
                    placeholder="Adresse Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="username"><span>Nom d'utilisateur</span></label>
                <input
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password"><span>Mot de passe</span></label>
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword"><span>Confirmer le mot de passe</span></label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmation du mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className="black">Créer un compte</button>
            </form>
            </>
        </div>
    );
};
