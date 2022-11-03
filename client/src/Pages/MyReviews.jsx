import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Review } from '../Components/Review'
import { getAuthorsBySearch } from '../requests/author'
import { booksByAuthor, booksByTitle } from '../requests/book'
import { getAllReviews, oneUserReviews } from '../requests/review'
import { selectUser } from '../store/authSlice'
import Select from "react-select"
import { customStyles } from '../styles/reactSelect'
import '../styles/sideNav.css'

export const MyReviews = () => {
    const connected = useSelector(selectUser)
    const [searchResult, setSearchResult] = useState()
    const [publishedState, setPublishedState] = useState('all')
    const [search, setSearch] = useState('')
    const [debounceSearch, setDebounceSearch] = useState(search)
    const [searchType, setSearchType] = useState('')
    const [error, setError] = useState()
    const [searchBar, setSearchBar] = useState(false)

    useEffect(() => {
      getReviewsData()
    }, [])

    useEffect(() => {
      const timer = setTimeout(() => setSearch(debounceSearch), 1000);
      return () => clearTimeout(timer);
    }, [debounceSearch])

    useEffect(() => {
      if(search !== ''){
        onSearchSubmit();
      }
      else{
          clearResults();
      }
    }, [search])

    useEffect(() => {
      clearResults()
      setError('')
      if(search){
        clearResults()
        onSearchSubmit()
      }
    }, [searchType])

    const getReviewsData = async () => {
      const data = await oneUserReviews(connected.userId)
      if(data?.status === 200){
        setSearchResult(data.data)
      }
    }

    const clearResults = () => setSearchResult([]);

    const onSearchSubmit = async () => {
      setSearchResult([])
      if(searchType === "book"){
        let books = await booksByTitle(search)
        if(books?.status === 200){
          books.data.map( async (b) =>{
            const reviews = await getAllReviews(b.id)
            reviews.map(r => {
              if(r.userId === connected.userId){
                setSearchResult(state => ([...state, r]))
              }
            })
          })
        }
      } else if(searchType === "author"){
        let authors = await getAuthorsBySearch(search)
        if(authors?.status === 200){
          authors.data.map(async (a) => {

            let books = await booksByAuthor(a.id)
  
            if(books?.status === 200 && authors?.data.length > 0){
              
              books.data.map( async (b) => {
                
                const reviews = await getAllReviews(b.id)
                reviews.map(r => {
                  if(r.userId === connected.userId){
                    setSearchResult(state => ([...state, r]))
                  }
                })

              })

            }
          })
        }
  
      } else {
        setError("Choisissez la recherche par titre ou par auteur")
      }
    }

    const options = [
      {value:'all', label: "Tous"},
      {value: 'published', label: 'Publiés'},
      {value:'not published', label: 'Non publiés'}
    ]
    

  return (
    <>
    <nav className={searchBar ? 'side-nav show' : "side-nav"}>
        <i className={searchBar ? "fa-solid fa-xmark show" : "fa-solid fa-xmark"} onClick={() => setSearchBar(false)}></i>
        <label htmlFor='filter' className='strong'>Filtrer : </label>
        <Select styles={customStyles} options={options} defaultValue={options[0]} onChange={(selectedOption) => setPublishedState(selectedOption.value)} noOptionsMessage={({inputValue}) => !inputValue ? "" : "Aucun résultat"}/>
        
        <label htmlFor='searchType' className='strong'>Recherche par :</label>
          <div className='type-search'>
            <label htmlFor="book">
              <input type="radio" value="book" id="book" onChange={(e) => setSearchType(e.target.value)} name="searchType" />
              Titre
            </label>
            <label htmlFor="author">
              <input type="radio" value="author" id="author" onChange={(e) => setSearchType(e.target.value)} name="searchType" />
              Auteur
            </label>
          </div>
          
        <input type="text" value={debounceSearch} onChange={(e) => setDebounceSearch(e.target.value)} placeholder='Recherche'/>
    </nav>
    
    <section className='search-result'>
      <i className={searchBar ? "fa-solid fa-magnifying-glass show" : "fa-solid fa-magnifying-glass"} onClick={() => setSearchBar(true)}></i>
      <h1>Mes Avis</h1>
      { error &&
        <p className="error">{error}</p>
      }
      { (searchResult && publishedState === "published") &&
          searchResult.map(r => {
            if(r.published === true)
              return <Review key={r.id} review={r} origin="account"/>
            })
      }
      { (searchResult && publishedState === "not published") &&
        searchResult.map(r => {
          if(r.published === false){
            return <Review key={r.id} review={r} origin="account"/>
          }
        })
      }
      { (searchResult && publishedState === "all") &&
        searchResult.map(r => <Review key={r.id} review={r} origin="account"/>)
      }
    </section>
    </>
  )
}
