import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBook } from '../requests/book'
import { getComments } from '../requests/comment'
import { checkReview, deleteReview } from '../requests/review'
import { username } from '../requests/user'
import { selectUser } from '../store/authSlice'
import { AddComment } from './AddComment'
import { Comment } from './Comment'
import { EditReview } from './EditReview'
import openBook from '../book-open-solid.svg'
import '../styles/review.css'

export const Review = (props) => {
    const {review, origin, update, counter} = props
    const connected = useSelector(selectUser)
    const [book, setBook] = useState()
    const [comments, setComments] = useState([])
    const [edit, setEdit] = useState(false)
    const [addComment, setAddComment] = useState(false)
    const [error, setError] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        
        if(origin === "account"){
            getBookData()
        }
        if(origin === "book" || origin ==="check"){
            getDataUser()
        }
        getCommentsData()
    }, [])

    useEffect(() => {
        if(error){
            setTimeout(() =>{
                setError('')
            }, 5000)
            
        }
    }, [error])

    const getBookData = async () => {
        const data = await getBook(review.bookId)
        if(data?.status === 200){
            setBook(data.data)
        }
    }

    const getCommentsData = async () => {
        const data = await getComments(review.id)
        if(data.length > 0){
            setComments(data)
        }
    }
    const getDataUser = async () => {
        const data = await username(review.userId)
        if(data){
            setUser(data.username)
        }
    }

    const delReview = async () => {
        const data = await deleteReview(review.id, connected.userId)
        if(data?.status === 200){
            if(origin !== "check"){
                window.location.reload()
            } else {
                update(counter+1)
            }
            
        } else {
            setError("Une erreur s'est produite")
        }
    }

    const updateReview = async () => {
        const data = await checkReview(review.id)
        if(data?.status === 200){
            update(counter+1)
        } else {
            setError("Une erreur s'est produite")
        }
    }

    return (
        <article className='review'>
        { error &&
            <p className='error'>{error}</p>
        }
        { review  &&
            <>
                { origin === "account"  &&
                    <Link to={`/livre/${book?.id}`} className='review-book'>
                        { book?.image ?
                            <img alt={book?.title}  src={book?.image} onError={(e) => { e.target.src = openBook}}/>
                            :
                            <img alt='Icon book open' src={openBook}/>
                        }
                        <h2>{book?.title}</h2>
                    </Link>
                }
                <div className='review-2'>

            
                    { origin === "book" &&
                        <>
                            <h2>Avis</h2>
                        </>
                    }
                    { origin !== "account" &&
                        <p className='comment-user'>{user}</p>
                    }
                    <div className={origin !=="check" ? "review-3" : ''}>
                        <div className='review-essential'>
                            <div>
                                <p>{review.rating} / 5 <i className="fa-solid fa-star"></i></p>
                                <p>{review.review}</p>
                            </div>
                        
                        
                            <div className='review-controls'>
                                
                                { (review.userId === connected.userId || connected.role === 1 || connected.role === 2) &&
                                    <i className="fa-solid fa-trash" onClick={() => delReview()}></i>
                                }
                                
                                { origin === "check" &&
                                    <i className="fa-regular fa-square-check" onClick={() => updateReview()}></i>
                                }
                                
                                { origin !== "check" &&
                                    <>
                                    { review.userId === connected.userId &&
                                        <i className="fa-regular fa-pen-to-square" onClick={() => setEdit(true)}></i>
                                    }
                                    </>
                                }
                            </div>
                        </div>   
                        { edit &&
                            <EditReview review={review} edit={setEdit}/>
                        }
                    </div>
                    
                    { origin !== "check" &&
                        <>
                        {comments?.length > 0  ?
                            <>
                                <p className='comment-title'>Commentaires</p>
                                {comments.map(c => 
                                    <Comment key={c.id} comment={c} reviewUser={review.userId} reviewId={review.id} />
                                )}
                            </>
                            :
                            <>
                            <p>Aucun commentaires</p>
                            </>
                        }
                        <div className='black-comment'><p className='black' onClick={() => setAddComment(!addComment)}><i className="fa-solid fa-plus"></i> commentaire</p></div>
                        { addComment &&
                            <AddComment reviewId={review?.id} addComment={setAddComment}/>
                        }
                        </>
                    }
                    
                    
                </div>
            </>
        }
        </article>
    )
}
