import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getAuthors, postAuthor} from '../requests/author'
import { postBook } from '../requests/book'
import Select from 'react-select'
import {customStyles} from '../styles/reactSelect.js'
import '../styles/addBook.css'

export const AddBook = () => {
    const [title, setTitle]= useState('')
    const [summary, setSummary] = useState('')
    const [authors, setAuthors] = useState([])
    const [author, setAuthor] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [images, setImages] = useState()
    const [filteredImages, setFilteredImages] = useState([])
    const [authorNotInList, setAuthorNotInList] = useState(false)
    const [image, setImage] = useState()
    const [errors, setErrors] = useState()
    const [options, setOptions] = useState([])
    const [valid, setValid] = useState()

    useEffect(() => {
        getAllAuthors()
    }, [])

    useEffect(() => {
        let data= [];
        if(authors.length > 0){
            authors.map(a => {
                data.push({value:a.id, label: a.name})
            })
        }
        setOptions(data)
    }, [authors])

    const getAllAuthors = async () => {
        const res = await getAuthors()
        setAuthors(res)
    }

    const getImages = () => {
        if(title){
            fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
                .then(result => result.json())
                .then(res => setImages(res.items))
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if(images){
            let filter = [];
            images.map(i => {
                if("imageLinks" in i.volumeInfo){
                    if("thumbnail" in i.volumeInfo.imageLinks){
                        filter.push(i)
                    }
                }
            })
            setFilteredImages(filter)
        }
    }, [images])

    useEffect(() => {
        if(errors || valid){
            setTimeout(() =>{
                setErrors('')
                setValid('')
            }, 5000)
            
        }
    }, [errors, valid])

    const submitForm = async (event) => {
        event.preventDefault();
        if(title && summary && (author || authorName)){
            if(authorNotInList){
                const filter = authors.filter(a => a.name === authorName)
                if(filter.length === 0) {
                    let result;
                    try {
                        result = await postAuthor(authorName)
                    } catch (err) {
                        await postAuthor(authorName)
                    }
                    if(result?.status === 201){
                        try{
                        const response = await postBook(title, result.data, summary, image)
                        setValid("Nouveau livre créé")
                        } catch (err) {
                            setErrors("Une erreur s'est produite. Veuillez réessayez.")
                        }
                    }
                } else {
                    try{
                        const response = await postBook(title, filter[0].id, summary, image)
                        setValid("Nouveau livre créé")
                    } catch (err) {
                        setErrors("Une erreur s'est produite. Veuillez réessayez.")
                    }
                }
                
            } else {
                try {
                    const res = await postBook(title, author, summary, image)
                } catch (err){
                    setErrors("Une erreur s'est produite. Veuillez réessayez.")
                }
            }
        } else {
            setErrors("Merci de remplir les champs titre, résumé et auteur")
        }
    }

    return (
        <div className='container'>
            <h1>Nouveau livre</h1>
            { errors &&
                <p className='error'>{errors}</p>
            }
            { valid &&
                <p className='success'>{valid}</p>
            }
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="title"><span>Titre</span></label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => getImages()}/>

                { !authorNotInList &&
                    <Select options={options} placeholder='Auteur' styles={customStyles} noOptionsMessage={({inputValue}) => !inputValue ? "" : "Aucun résultat"}/>
                }

                <label htmlFor='authorNotInList' className='label-checkbox'>
                    <input checked={authorNotInList} onChange={() => setAuthorNotInList(!authorNotInList)} name='authorNotInList' type="checkbox" id="authorNotInList"/>
                    L'auteur n'est pas dans la liste
                </label>
                { authorNotInList &&
                    <>
                        <label htmlFor='authorName'><span>Auteur</span></label>
                        <input type="text" name="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)}/>
                    </>                    
                }

                <label htmlFor="summary"><span>Résumé</span></label>
                <textarea name="summary" value={summary} onChange={(e) => setSummary(e.target.value)}/>
                


                { filteredImages.length > 0 &&

                    <div className='images'>
                        <img alt={filteredImages[0]?.volumeInfo?.title} onClick={() => {image !== filteredImages[0]?.volumeInfo?.imageLinks?.thumbnail ? setImage(filteredImages[0]?.volumeInfo?.imageLinks?.thumbnail): setImage('')}} src={filteredImages[0]?.volumeInfo?.imageLinks?.thumbnail} style={{border: image === filteredImages[0]?.volumeInfo?.imageLinks?.thumbnail ? "3px solid black": "0"}}/>  
                        <img alt={filteredImages[1]?.volumeInfo?.title}onClick={() => {image !== filteredImages[1]?.volumeInfo?.imageLinks?.thumbnail ? setImage(filteredImages[1]?.volumeInfo?.imageLinks?.thumbnail): setImage('')}} src={filteredImages[1]?.volumeInfo?.imageLinks?.thumbnail} style={{border: image === filteredImages[1]?.volumeInfo?.imageLinks?.thumbnail ? "3px solid black": "0"}}/>    
                        <img alt={filteredImages[2]?.volumeInfo?.title} onClick={() => {image !== filteredImages[2]?.volumeInfo?.imageLinks?.thumbnail ? setImage(filteredImages[2]?.volumeInfo?.imageLinks?.thumbnail): setImage('')}} src={filteredImages[2]?.volumeInfo?.imageLinks?.thumbnail} style={{border: image === filteredImages[2]?.volumeInfo?.imageLinks?.thumbnail ? "3px solid black": "0"}}/> 
                    </div>

                }
                <input type="submit" className='black'/>

            </form> 
        </div>
        
    )
}
