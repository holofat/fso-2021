import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import About from './components/About'
import Footer from './components/Footer'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(<Notification message={null}/>)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setNotification(<Notification message={anecdote.content}/>)
    setTimeout(() => {
      setNotification(<Notification message={null}/>)
    }, 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      {notification}
      <Switch>
        <Route exact path="/">
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes}/>
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew}/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  )
}

export default App;