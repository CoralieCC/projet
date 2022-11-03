import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddBook } from '../Pages/AddBook'
import { Users } from '../Pages/admin/Users'
import { Author } from '../Pages/Author'
import { Book } from '../Pages/Book'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'
import { PublicationToCheck } from '../Pages/moderator/PublicationToCheck'
import { MyReviews } from '../Pages/MyReviews'
import { Register } from '../Pages/Register'
import { AdminRoute } from './AdminRoute'
import { ModeratorRoute } from './ModeratorRoute'
import {PrivateRoute} from './PrivateRoute'

export const Router = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path='/accueil' element={<Home/>}/>
                <Route path='/nouveau-livre' element={<AddBook/>}/>
                <Route path='/livre/:id' element={<Book />}/>
                <Route path='/auteur/:id' element={<Author/>}/>
                <Route path='/mes-avis' element={<MyReviews />}/>
            </Route>
            <Route element={<AdminRoute />}>
                <Route path='/utilisateurs' element={<Users />}/>
            </Route>
            <Route element={<ModeratorRoute/>}>
                <Route path='/publications-a-valider' element={<PublicationToCheck/>}/>
            </Route>
            <Route path='/register' element={<Register />}/>
            <Route path='/' element={<Login/>}/>
            
        </Routes>
    )
}
