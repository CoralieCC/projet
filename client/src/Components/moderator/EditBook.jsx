import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAuthors, postAuthor } from '../../requests/author'
import { postBook, updateBook } from '../../requests/book'
import Select from 'react-select'
import { customStyles } from '../../styles/reactSelect'
import '../../styles/addBook.css'

export const EditBook = (props) => {
    const{book, update, counter, edit} = props
    const [title, setTitle] = useState(book.title)
    const [summary, setSummary] = useState(book.summary)
    const [authors, setAuthors] = useState([])
    const [author, setAuthor] = useState(book.authorId)
    const [authorName, setAuthorName] = useState('')
    const [images, setImages] = useState()
    const [filteredImages, setFilteredImages] = useState([])
    const [authorNotInList, setAuthorNotInList] = useState(false)
    const [image, setImage] = useState(book.image)
    const [options, setOptions] = useState([])
    const [errors, setErrors] = useState()
    const [authorDefault, setAuthorDefault] = useState()

    useEffect(() => {
        getAllAuthors()
        getImages()
    }, [])

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
        let data= [];
        if(authors.length > 0){
            authors.map(a => {
                data.push({value:a.id, label: a.name})
            })
        }
        setOptions(data)
    }, [authors])

    useEffect(() => {
        if(options.length > 0){
            const filter = options.filter(opt => opt.value === author)
            setAuthorDefault(filter[0].label)
            
        }
    }, [options, author])

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

    const submitForm = async (event) => {
        event.preventDefault()
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
                            const response = await updateBook(book.id, title, summary, image, result.data)
                            update(counter+1)
                        } catch (err) {
                            setErrors("Une erreur s'est produite. Veuillez réessayez.")
                        }
                    }
                } else {
                    try{
                        const response = await updateBook(book.id, title, summary, image, filter[0].id)
                        update(counter+1)
                    } catch (err) {
                        setErrors("Une erreur s'est produite. Veuillez réessayez.")
                    }
                }
                
            } else {
                try {
                    const res = await updateBook(book.id, title, summary, image, author)
                    update(counter+1)
                } catch (err){
                    setErrors("Une erreur s'est produite. Veuillez réessayez.")
                }
            }
        } else {
            setErrors("Merci de remplir les champs titre, résumé et auteur")
        }
    }

    

    return (
    <div className='container edit'>
            { errors &&
                <p>{errors}</p>
            }
            <div className='icon'><i className="fa-solid fa-xmark" onClick={() => edit(false)}></i></div>
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="title"><span>Titre</span></label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => getImages()}/>
                { !authorNotInList &&
                    <Select options={options} placeholder={authorDefault} defaultValue={options[0]} styles={customStyles} noOptionsMessage={({inputValue}) => !inputValue ? "" : "Aucun résultat"}/>
                }
                <label htmlFor='authorNotInList' className='label-checkbox'>
                    <input id="authorNotInList" checked={authorNotInList} onChange={() => setAuthorNotInList(!authorNotInList)} name='authorNotInList' type="checkbox"/>
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
                
                
                
                


                { filteredImages &&

                    <div className='images'>
                        <img alt={filteredImages[0]?.volumeInfo?.title} onClick={() => {image !== filteredImages[0]?.volumeInfo?.imageLinks?.thumbnail ? setImage(filteredImages[0]?.volumeInfo?.imageLinks?.thumbnail): setImage('')}} src={filteredImages[0]?.volumeInfo?.imageLinks?.thumbnail} style={{border: image === filteredImages[0]?.volumeInfo?.imageLinks?.thumbnail ? "2px solid black": "0"}}/>  
                        <img alt={filteredImages[1]?.volumeInfo?.title} onClick={() => {image !== filteredImages[1]?.volumeInfo?.imageLinks?.thumbnail ? setImage(filteredImages[1]?.volumeInfo?.imageLinks?.thumbnail): setImage('')}} src={filteredImages[1]?.volumeInfo?.imageLinks?.thumbnail} style={{border: image === filteredImages[1]?.volumeInfo?.imageLinks?.thumbnail ? "2px solid black": "0"}}/>    
                        <img alt={filteredImages[2]?.volumeInfo?.title} onClick={() => {image !== filteredImages[2]?.volumeInfo?.imageLinks?.thumbnail ? setImage(filteredImages[2]?.volumeInfo?.imageLinks?.thumbnail): setImage('')}} src={filteredImages[2]?.volumeInfo?.imageLinks?.thumbnail} style={{border: image === filteredImages[2]?.volumeInfo?.imageLinks?.thumbnail ? "2px solid black": "0"}}/> 
                    </div>

                }
                <input type="submit" className='black'/>

            </form> 
        </div>
    )
}
