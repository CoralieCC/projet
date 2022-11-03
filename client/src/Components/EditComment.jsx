import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { putComment } from '../requests/comment'
import { selectUser } from '../store/authSlice'

export const EditComment = (props) => {
    const {comment, edit} = props
    const connected = useSelector(selectUser)
    const [commentContent, setCommentContent] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        setCommentContent(comment.comment)
    }, [])

    const submitForm = async (event) => {
        event.preventDefault()
        const data = await putComment(connected.userId, comment.id, commentContent)
        if(data?.status === 200){
            window.location.reload()
        } else {
            setError("Une erreur s'est produite")
        }
    }

    return (
        <div className='edit-comment'>
        <div className='icon'><i className="fa-solid fa-xmark" onClick={() => edit(false)}></i></div>
        <form onSubmit={(e) => submitForm(e)}>
            <label htmlFor="comment"><span>Commentaire</span></label>
            <textarea name="comment" id="comment" cols="30" rows="10" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} minLength='5'></textarea>

            <button type="submit" className='black'>Enregistrer</button>
        </form>
        </div>
    )
}
