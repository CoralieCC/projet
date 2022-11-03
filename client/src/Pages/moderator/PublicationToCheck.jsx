import React, { useState } from 'react'
import { useEffect } from 'react'
import { Comment } from '../../Components/Comment'
import { CondensedBook } from '../../Components/CondensedBook'
import { Review } from '../../Components/Review'
import { getAllBooksNotChecked } from '../../requests/book'
import { getAllCommentsNotChecked } from '../../requests/comment'
import { getAllReviewsNotChecked } from '../../requests/review'
import '../../styles/toCheck.css'

export const PublicationToCheck = () => {
    const [books, setBooks] = useState()
    const [reviews, setReviews] = useState()
    const [comments, setComments] = useState()
    const [selected, setSelected] = useState('all')
    const [updateList, setUpdateList] = useState(0)
    const [error, setError] = useState()

    useEffect(() => {
        getBooksData()
        getReviewsData()
        getCommentsData()
    }, [])

    useEffect(() => {
        getBooksData()
        getReviewsData()
        getCommentsData()
    }, [updateList])

    useEffect(() => {
        if(error){
            setTimeout(() =>{
                setError('')
            }, 5000)
            
        }
    }, [error])


    const getBooksData = async () => {
        const data = await getAllBooksNotChecked()
        if(data?.status === 200){
            setBooks(data.data)
        }
    }

    const getReviewsData = async () => {
        const data = await getAllReviewsNotChecked()
        if(data?.status === 200){
            setReviews(data.data)
        } 
    }

    const getCommentsData = async () => {
        const data = await getAllCommentsNotChecked()
        if(data?.status === 200){
            setComments(data.data)
        }
    }
    return (
        <>
            <nav className='publication'>
                <span className="button" onClick={() => setSelected('books')}>Livres</span>
                <span className="button"onClick={() => setSelected('reviews')}>Avis</span>
                <span className="button"onClick={() => setSelected('comments')}>Commentaires</span>
                <span className="button"onClick={() => setSelected('all')}>Tous</span>
            </nav>
            { error &&
                <p className='error'>{error}</p>
            }
            <section className='check'>
                { (selected === 'books' || selected === 'all') &&
                    books?.map(b => 
                        <CondensedBook key={b.id} book={b} origin="check" update={setUpdateList} counter={updateList} error={setError}/>
                    )
                }
                { (selected === 'reviews' || selected === 'all') &&
                    reviews?.map(r => {
                        if(r.published === true){
                            return <Review review={r} key={r.id} origin="check" update={setUpdateList} counter={updateList}/>
                        }
                    })
                }
                { (selected === 'comments' || selected === 'all') &&
                    comments?.map(c => 
                        <Comment key={c.id} comment={c} origin="check" update={setUpdateList} counter={updateList}/>
                    )
                }
            </section>
            
        
        </>
    )
}
