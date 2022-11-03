import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CondensedBook } from '../Components/CondensedBook'
import { getAuthorsBySearch } from '../requests/author'
import { booksByAuthor, booksByTitle } from '../requests/book'

export const Home = () => {
  const [search, setSearch] = useState('')
  const [debounceSearch, setDebounceSearch] = useState(search)
  const [searchType, setSearchType] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [error, setError] = useState()
  const [searchBar, setSearchBar] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debounceSearch), 1000);
    return () => clearTimeout(timer);
  }, [debounceSearch])

  useEffect(() => {
    if(search !== ''){
      onSearchSubmit(search);
    }
    else{
        clearResults();
    }
  }, [search])

  useEffect(() => {
    clearResults()
    setError('')
    if(search){
      onSearchSubmit()
    }
  }, [searchType])


  const onSearchSubmit = async () => {
    
    if(searchType === "book"){
      let data = await booksByTitle(search)
      if(data?.status === 200){
        setSearchResult(data.data)
      }
    } else if(searchType === "author"){
      setSearchResult([])
      let authors = await getAuthorsBySearch(search)
      if(authors?.status === 200){
        authors.data.map(async (a) => {

          let books = await booksByAuthor(a.id)

          if(books?.status === 200 && authors?.data.length > 0){
            
            books.data.map(item => setSearchResult(state => ([...state, item])))

          }
        })
      }
    } else {
      setError("Choisissez la recherche par titre ou par auteur")
    }
  }

  const clearResults = () => setSearchResult([]);

  return (
    <>
      <nav className={searchBar ? 'side-nav show' : "side-nav"}>
          <i className={searchBar ? "fa-solid fa-xmark show" : "fa-solid fa-xmark"} onClick={() => setSearchBar(false)}></i>
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
          <input type="text" value={debounceSearch} onChange={(e) => setDebounceSearch(e.target.value)} placeholder="Recherche"/>
      </nav>
      

      <section className='search-result'>
        <i className={searchBar ? "fa-solid fa-magnifying-glass show" : "fa-solid fa-magnifying-glass"} onClick={() => setSearchBar(true)}></i>
        <h1>Résultats</h1>
        { error &&
          <p className="error">{error}</p>
        }
        { searchResult?.length > 0 &&
          searchResult.map(b => 
            <CondensedBook key={b.id} book={b} origin="search"/>
            )
        }
      </section>
    
    
    
    </>
  )
}
