import { useEffect, useState } from 'react'
import UserInput from './compontents/UserInput'
import OutputList from './compontents/OutputList'
import countriesService from './services/countriesService'
import OutputCountry from './compontents/OutputCountry'
const apiKey = import.meta.env.VITE_SOME_KEY 
const App = () => {
  const [filter, setFilterWoord] = useState('')
  const [countries, setCountries] = useState([])
  const [showPressed, setShowPressed] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error => console.log('an error happened while fetching the data' + error))
  }, [])

  const handleFilter = (event) => {
    setFilterWoord(event.target.value.toLowerCase())
    setShowPressed(false)
  }
  const countriesPossible = (filter, countries) => {
    const countriesFiltered = []
    countries.map((country) => {
      if (country.name.common.toLowerCase().includes(filter)) {
        countriesFiltered.push(country)
      }
    })
    return countriesFiltered
  }
  const filteredCountries = countriesPossible(filter, countries)
  const handleShowButton = (country) => {
    setShowPressed(true)
    setIndex(filteredCountries.indexOf(country))
  }
  

  return (
    <div>
    <UserInput value={filter} onChange={handleFilter}/>
    {filteredCountries.length > 10
      ? "too many possibilities" 
      : filteredCountries.length === 1
          ? <OutputCountry apiKey ={apiKey} country={filteredCountries[0]} />
          : showPressed
            ? <OutputCountry apiKey={apiKey} country={filteredCountries[index]} />
            : <OutputList filteredCountries={filteredCountries} onClick={handleShowButton} />
    }
    </div>
  )
}

export default App
