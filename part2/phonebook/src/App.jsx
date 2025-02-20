import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import RenderPersons from './components/RenderPersons'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilterWoord] = useState('')

  useEffect(() => {    
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName && person.number === newNumber)) {
      window.alert(`${newName} is already in the phonebook`)
    }
    else if (persons.some(person => person.name === newName)) {
      const personToUpdate = persons.find(person => person.name === newName)
      const changedPerson = {...personToUpdate, number: newNumber}
      if(window.confirm(`${personToUpdate.name} is already in the phonebook, do you want to update the number?`)){
        console.log(changedPerson)
        personService
          .update(personToUpdate.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilterWoord(event.target.value.toLowerCase())
  }

  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(person.id)
        .then( () => {
          setPersons(persons.filter(p => p.id !== person.id));
        }
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter}/>
      <h2>Add a new person</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <RenderPersons 
        persons={persons} 
        filter={filter} 
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App