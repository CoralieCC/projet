import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate} from 'react-router-dom'
import { postComment } from '../requests/comment'
import { selectUser } from '../store/authSlice'
import '../styles/addEditComment.css'

export const AddComment = (props) => {
    const {reviewId, addComment} = props
    const navigate = useNavigate()
    const location = useLocation()
    const connected = useSelector(selectUser)
    const [comment, setComment] = useState()
    const [error, setError] = useState()

    const submitForm = async (event) => {
        event.preventDefault()
        const data = await postComment(connected.userId, reviewId, comment)
        console.log(data)
        if(data?.status === 201){
            window.location.reload()
        } else {
            setError("Une erreur s'est produite")
        }

    }

    return (
        <div className='add-comment'>
            <div className='icon'><i className="fa-solid fa-xmark" onClick={() => addComment(false)}></i></div>
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="comment"><span>Commentaire</span></label>
                <textarea name="comment" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} minLength='5'></textarea>

                <button type="submit" className='black'>Enregistrer</button>
            </form>
        </div>
        
    )
}
