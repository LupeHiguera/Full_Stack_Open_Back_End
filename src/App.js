import { useEffect, useState } from 'react'
import Person from "./Components/Person";
import Filter from "./Components/Filter";
import personService from './Service/Person'
import Notification from "./Components/Notification"
import './index.css'

const App = () => {
    const [newId, setNewId] = useState(0)
    const [persons, setPersons] = useState([])
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const [newFilter, setNewFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newPerson, setNewPerson] = useState('')
    useEffect(() => {
        personService
            .getAll()
            .then(initialPerson => {
                setPersons(initialPerson)
            })
    }, [])
    useEffect(() => {
        setFilteredPersons(
            persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        )
    }, [newFilter, persons]) // whenever newFilter or persons changes, recalculate filteredPersons
    const addPerson = (event) => {
        event.preventDefault()
        // Logic to check if the person is already present
        const found = persons.some(existingUser => existingUser.name === newName)
        if(!found){
            const personObject = {
                name: newName,
                number: newPhoneNumber,
                id: newId,
            }
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewPerson(newName)
                    setNewName('')
                    setNewId(newId + 1)
                    setNewPhoneNumber('')
                })
        }
        else{
            alert(`${newName} is already added to phonebook`)
        }
    }
    const deletePerson = (id) => {
        personService
            .deletePerson(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }
    const handlePhoneNumberChange = (event) => {
        setNewPhoneNumber(event.target.value)
    }
    return (
      <div>
        <h2>Phonebook</h2>
          <Notification name={newPerson}></Notification>
          <h2>Add a new person</h2>
          <Filter handleFilterChange={handleFilterChange}></Filter>
        <form onSubmit={addPerson}>
          <div>
            name:
              <input
                value={newName}
                onChange={handlePersonChange}
              />
          </div>
            <div>
                number:
                <input
                    value={newPhoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
            <ul>
                {filteredPersons.map(person =>
                    <Person key={person.id}
                            name={person.name}
                            phoneNumber={person.number}
                            deletePerson={() => deletePerson(person.id)
                    }/>
                )}
            </ul>
      </div>
    )
}

export default App