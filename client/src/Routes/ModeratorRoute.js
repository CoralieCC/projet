import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectUser } from '../store/authSlice'

export const ModeratorRoute = () => {
    const connected = useSelector(selectUser)

    return (
        <>
            { connected?.role ?
                (connected.role === 1 || connected.role === 2) ? <Outlet /> : <Navigate to='/'/>
                :
                <Navigate to='/'/>
            }
        </>
        
    )
}