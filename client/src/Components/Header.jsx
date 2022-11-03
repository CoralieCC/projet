import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { disconnect, selectConnected, selectUser } from '../store/authSlice'
import '../styles/header.css'

export const Header = () => {
    const connected = useSelector(selectConnected)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [burger, setBurger] = useState(false)
    

    return (
        <header className={connected ? 'header connected' : "header" }>
            <div className={connected ? burger ? "nav show" : 'nav' : "nav not-connected"}>
                <span className='title'>Projet</span>
                <nav className={connected ? "header-nav" : ""}>
                    { connected ?
                        <>
                            <NavLink className='white' to='/nouveau-livre' >Ajouter un livre</NavLink>
                            <NavLink className='white' to='/mes-avis'>Mes avis</NavLink>
                            <NavLink className='white' to='/accueil'>Recherche</NavLink>
                            { (user?.role === 2 || user?.role === 1) &&
                                <NavLink className="white" to='/publications-a-valider'>A valider</NavLink>
                            }
                            { user?.role === 1 &&
                                <NavLink className="white" to='/utilisateurs'>Utilisateurs</NavLink>
                            }
                            <p className='white' onClick={() => dispatch(disconnect())}>Se déconnecter</p>
                        </>
                    :
                        <>
                            <Link to="/" className='white'>Se Connecter</Link>
                            <Link to="/register" className='black'>Créer un compte</Link>
                        </>
                    }
                </nav>
                <div className={connected ? "burger show" : "burger"} onClick={() => setBurger(!burger)}>
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                    <div className="line line3"></div>
                </div>
            </div>
        </header>
    )
}
