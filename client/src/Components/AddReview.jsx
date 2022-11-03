import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { postReview } from '../requests/review'
import { selectUser } from '../store/authSlice'
import Select from "react-select"
import { customStyles } from '../styles/reactSelect'
import '../styles/addEditReview.css'

export const AddReview = (props) => {
    const {bookId, addReview} = props
    const connected = useSelector(selectUser)
    const [rating, setRating] = useState("")
    const [review, setReview] = useState("")
    const [published, setPublished] = useState(false)
    const [error, setError] = useState()


    const submitForm = async (event) => {
        event.preventDefault()
        if(rating !== ""){
            sendData()
            
        }
    }

    const sendData = async () => {
        const data = await postReview(connected.userId, bookId, review, rating, published)
        if(data?.status === 201){
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
        <div className='add-review'>
            <div className='icon'><i className="fa-solid fa-xmark" onClick={() => addReview(false)}></i></div>
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
                <textarea name="review" id="review" value={review} onChange={(e) => setReview(e.target.value)} minLength="3"></textarea>

                <button type="submit" className='black'>Enregistrer</button>

            </form>
        
        </div>
        
    )
}
