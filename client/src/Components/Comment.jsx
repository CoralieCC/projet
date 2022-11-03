import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { checkComment, deleteComment } from '../requests/comment'
import { username } from '../requests/user'
import { selectUser } from '../store/authSlice'
import { EditComment } from './EditComment'
import '../styles/comment.css'

export const Comment = (props) => {
    const {comment, reviewUser, reviewId, origin, update, counter} = props
    const connected = useSelector(selectUser)
    const [user, setUser] = useState()
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState()

  useEffect(() => {
    getDataUser()
  }, [])

  useEffect(() => {
    if(error){
        setTimeout(() =>{
            setError('')
        }, 5000)
        
    }
}, [error])

  const getDataUser = async () => {
    const data = await username(comment.userId)
    if(data){
        setUser(data.username)
    }
  }

  const delComment = async () => {
    const data = await deleteComment(comment.id, reviewId, connected.userId)
    if(data?.status === 200){
      if(origin ===  "check"){
        update(true)
      } else {
        window.location.reload()
      }
      
    } else {
      setError("Une erreur s'est produite")
    }
  }

  const updateComment = async () => {
    const data = await checkComment(comment.id)
    if(data?.status === 200){
      update(counter+1)
    } else {
      setError("Une erreur s'est produite")
    }
  }

  return (
    <article className={origin!=='check'? "comment": "comment check"}>
      { error &&
        <p className="error">{error}</p>
      }
      <div className='comment-2'>
        <div>
          <p className='comment-user'>{user}</p>
          <p>{comment.comment}</p>
        </div>

        <div>
          { (comment.userId === connected.userId || connected.role === 2 || connected.role === 1 || connected.userId === reviewUser) &&
              <i className="fa-solid fa-trash" onClick={() => delComment()}></i>
          }
          { (comment.userId === connected.userId && origin !== "check") &&
            <i className="fa-regular fa-pen-to-square" onClick={() => setEdit(true)}></i>   
          }
          { origin === "check" &&
            <i className="fa-regular fa-square-check" onClick={() => updateComment()}></i>
          }

        </div>
      </div>

      { edit &&
        <EditComment comment={comment} edit={setEdit}/>
      }
      

    </article>
  )
}
