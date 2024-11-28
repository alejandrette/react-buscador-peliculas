import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if(search === ''){
      setError('No has ingresado ningún valor')
      return
    }

    if(search.match(/^\d+$/)){
      setError('No se puede buscar una película con un número')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}