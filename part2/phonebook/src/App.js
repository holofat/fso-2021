import {useState, useEffect} from 'react'
import './App.css'

import contact from './services/contact'

const Filter = (props) =>{
  return (
    <form>
      filter shown with <input value={props.value || ''} onChange={props.change}/>
    </form>
  )
}

const PersonForm = (props) => {
  return(
    <form>
      name: <input value={props.nameValue} onChange={props.nameChange}/><br/>
      number: <input value={props.numberValue || ''} onChange={props.numberChange}/><br/>
      <button type='submit' onClick={props.addNote}>add</button>
    </form>
  )
}

const Number = ({person, handleDelete}) =>{
  return (
    <>
      <li>{person.name} {person.number} <button onClick={() => handleDelete(person.name, person.id)}>delete</button></li>
    </>
  )
}

const Notification = ({message, error}) => {
  if(message === null){
    return null
  }

  const theMessage = error ? 'error':'message'
  return(
    <div className={theMessage}>
      {message}
    </div>
  )  
}

const Numbers = ({persons, handleDelete, filter}) => {
  const toShow = persons.reduce((r, o) => {
    if(o.name.toLowerCase().includes(filter.toLowerCase())){
      return r.concat({
        name: o.name,
        number: o.number,
        id:o.id,
      })
    }
    return r
  }, [])

  

  return (
    <>
      {toShow.map((p, i) => <Number key={i} person={p} handleDelete={() => handleDelete(p.name, p.id)}/>)}
    </>
  )
}



const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState()
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(false)


  useEffect(() => {
    contact.getAll().then(res => setPersons(res.data))
  }, [persons.length])

  //axios.get('http://localhost:3001/persons').then(res => setPersons(res.data))
  

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const person = persons.find((person) => person.name === personObject.name)

    if(person){
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one? `)){
        contact.update(person.id, personObject)
          .then(() => {
            setPersons(persons.map(person => {
              if(person.name === personObject.name) {
                const number = personObject.number
                return {...person, number}
              }else {
                return person
              }
            }))
          })
          .catch(err => {
            setMessage(`Information of ${person.name} has already been removed from server`)
            setError(true)
            setTimeout(() => {
              setMessage(null)
              setError(false)
            }, 2000)
          })
      }
    } else{
      setPersons(persons.concat(personObject))
      contact.create(personObject).then(res => console.log(res))

      setNewName('')

      setNewNumber('')

      setMessage(`${personObject.name} is added`)

      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const delCon = (name, id) => {
    if(window.confirm(`Delete ${name}`)){
      contact.deleteContact(id)
      setPersons(persons.filter((person) => person.name !== name ))
    }
  }

  

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} error={error}/>

      <Filter value={newFilter} change={handleFilterChange}/>
      
      <h3>Add a new</h3>

      <PersonForm nameValue={newName} numberValue={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} addNote={addPerson}/>

      <h2>Numbers</h2>
      
      <Numbers persons={persons} filter={newFilter} handleDelete={delCon}/>

    </div>
  )
}

export default App;
