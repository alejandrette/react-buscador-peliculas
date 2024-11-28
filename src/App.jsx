import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies.js'
import { useSearch } from './hooks/useSearch.js'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
  }, 300), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input 
            onChange={handleChange}
            value={search}
            type="text"
            placeholder='Avengers, Star Wars...'
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type='submit'>
            Search
          </button>
        </form>
      </header>

      {error && <p style={{color: 'red'}}>{error}</p>}

      <main>
        {loading 
          ? <p>Cargando...</p>
          : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
