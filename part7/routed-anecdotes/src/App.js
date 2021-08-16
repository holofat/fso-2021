import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)



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