import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CondensedBook } from '../Components/CondensedBook'
import { getOneAuthor } from '../requests/author'
import { booksByAuthor } from '../requests/book'

export const Author = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [author, setAuthor] = useState()
    const [books, setBooks] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        getAuthorData()
        getBooksByAuthor()
    }, [])

    useEffect(() => {
        if(error){
            setTimeout(() =>{
                setError('')
            }, 5000)
        }
    }, [error])

    const getAuthorData = async () => {
        const data = await getOneAuthor(id)
        if(data){
            setAuthor(data)
        } else {
            navigate('/home')
        }
    }
    const getBooksByAuthor = async () => {
        const data = await booksByAuthor(id)
        if(data?.status === 200){
            setBooks(data.data)
        } else {
            setError("Une erreur s'est produite")
        }
    }

    return (
        <>
        <h1>{author?.name}</h1>
        { error &&
            <p className="error">{error}</p>
        }
        { books &&
            books.map(b => 
                <CondensedBook book={b} key={b.id} origin="author"/>
            )
        }
        </>
    )
}
