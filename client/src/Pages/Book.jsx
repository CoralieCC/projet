import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AddReview } from '../Components/AddReview'
import { Review } from '../Components/Review'
import { getOneAuthor } from '../requests/author'
import { getBook } from '../requests/book'
import { getAllReviews } from '../requests/review'
import { disconnect } from '../store/authSlice'
import bookOpen from "../book-open-solid.svg"
import '../styles/book.css'

export const Book = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [book, setBook] = useState()
    const [reviews, setReviews] = useState()
    const [author, setAuthor] = useState()
    const [addReview, setAddReview] = useState(false)

    useEffect(() => {
        getBookData()
        getReviews()
    }, [])

    useEffect(() => {
        if(book){
            getAuthor()
        }
    }, [book])

    const getBookData = async () => {
        const data = await getBook(id)
        console.log(data)
        if(data?.status === 200){
            setBook(data.data)
        } else if(data?.status){
            dispatch(disconnect())
        } else {
            navigate('/accueil')
        }
    }

    const getReviews = async () => {
        const data = await getAllReviews(id)
        if(data){
            setReviews(data)
        }
    }
    const getAuthor = async () => {
        const data = await getOneAuthor(book.authorId)

        if(data){
            setAuthor(data)
        }
    }

    return (
        <section className='book'>
            <div className='condensed-book'>
                <h1>{book?.title}</h1>
                <h2><Link to={`/auteur/${author?.id}`}>{author?.name}</Link></h2>
                <div>
                    { book?.image ?
                        <div className='image'><img alt={book?.title} src={book?.image} onError={(e) => e.target.src = bookOpen}/></div>
                        :
                        <div className='image'><img alt="Icon book open" src={bookOpen}/></div>
                    }
                        
                    <p>{book?.summary}</p>
                </div>
                
                
                <div className='black-comment'><p onClick={() => setAddReview(true)} className="black">Ajouter un avis</p></div>

                { addReview &&
                    <AddReview bookId={book?.id} addReview={setAddReview}/>
                }
            </div>
        
        { (reviews?.length > 0) ?
            reviews.map(r => {
                if(r.published) return <Review key={r.id} review={r} origin="book"/> 
            })
            :
            <p>Aucun avis</p>
        }
        
        </section>
    )
}
