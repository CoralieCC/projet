import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { putReview } from '../requests/review'
import { selectUser } from '../store/authSlice'
import Select from "react-select"
import { customStyles } from '../styles/reactSelect'
import '../styles/addEditReview.css'

export const EditReview = (props) => {
    const {review, edit} = props
    const connected = useSelector(selectUser)
    const [reviewContent, setReviewContent] = useState('')
    const [rating, setRating] = useState('')
    const [published, setPublished] = useState('')
    const [error, setError] = useState()

    useEffect(() => {
        setReviewContent(review.review)
        setRating(review.rating)
        setPublished(review.published)
    }, [])

    const submitForm = async (event) => {
        event.preventDefault()
        const data = await putReview(connected.userId, review.id, reviewContent, rating, published)
        if(data?.status === 200){
            window.location.reload()
        } else {
            setError("Une erreur s'est produite")
        }
    }

    const options = [
        {value: 1, label: '1'},
        {value: 1.5, label: '1.5'},
        {value: 2, label: '2'},
        {value: 2.5, label: '2.5'},
        {value: 3, label: '3'},
        {value: 3.5, label: '3.5'},
        {value: 4, label: '4'},
        {value: 4.5, label: '4.5'},
        {value: 5, label: '5'},
    ]
    return (
        <div className='edit-review'>
                <div className='icon'><i className="fa-solid fa-xmark" onClick={() => edit(false)}></i></div>
                <form onSubmit={(e) => submitForm(e)}>
                    <div className='flex'>
                        <Select 
                            className='select-rating' 
                            options={options} 
                            onChange={(e) => setRating(e.value)} 
                            placeholder='Note' styles={customStyles}
                            getOptionLabel={e => (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: 5 }}>{e.label}</span>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            )}
                            noOptionsMessage={({inputValue}) => !inputValue ? "" : "Aucun résultat"}
                        />
                        <label htmlFor="published">
                            <input type="checkbox" checked={published} onChange={() => setPublished(!published)} />
                            Publier
                        </label> 
                    </div>                     

                    <label htmlFor="review"><span>Avis</span></label>
                    <textarea name="review" id="review"  value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} minLength="3"></textarea>

                    <button type="submit" className='black'>Enregistrer</button>

                </form>
            
            </div>
    )
}
