import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOneAuthor } from '../requests/author'
import { checkBook, deleteBook } from '../requests/book'
import { EditBook } from './moderator/EditBook'
import bookOpen from '../book-open-solid.svg'
import '../styles/book.css'

export const CondensedBook = (props) => {
    const{book, origin, update, counter, error} = props
    const [author, setAuthor] = useState()
    const [edit, setEdit] = useState(false)
    

    useEffect(() => {
        if(origin !== "author"){
            getAuthorData()
        }
    }, [])


    const getAuthorData = async () => {
        const data = await getOneAuthor(book.authorId)

        if(data){
            setAuthor(data)
        }
    }

    const updateCheck = async () => {
        const data = await checkBook(book.id)
        if(data === 'Resource updated'){
            update(counter+1)
        } 
    }

    const delBook = async () => {
        const data = await deleteBook(book.id)
        if(data === 'Resource deleted'){
            update(counter+1)
        } else {
            error("Une erreur s'est produite")
        }
    }
    return (
        <>
        { book &&
            <article className={origin === "check" ? 'condensed-book check' :'condensed-book'}>
                <h2><Link to={`/livre/${book.id}`}>{book.title}</Link></h2>
                { origin !== "author" &&
                    <h3><Link to={`/auteur/${author?.id}`}>{author?.name}</Link></h3>
                }
                <div>
                    { book?.image ?
                        <div className='image'><img alt={book?.title} src={book?.image} onError={(e) => e.target.src = bookOpen}/></div>
                        :
                        <div className='image'><img alt='Icon book open' src={bookOpen}/></div>
                    }
                    <p>{book.summary}</p>
                    { origin === "check" &&
                        <div>
                            <i className="fa-solid fa-trash" onClick={() => delBook()}></i>
                            <i className="fa-regular fa-pen-to-square" onClick={() => setEdit(true)}></i>
                            <i className="fa-regular fa-square-check" onClick={() => updateCheck()}></i>
                            
                        </div>
                    }
                </div>
                { edit && 
                    <EditBook book={book} update={update} counter={counter} edit={setEdit}/>
                }
                
            </article>
        }
        
        
        
        </>
        
    )
}
