import React from 'react'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>{
        const link = `/anecdotes/${anecdote.id}`
        return (
          <div key={anecdote.id}>
            <Link to={link}><li>{anecdote.content}</li></Link>
          </div> 
        )
      })}
    </ul>
  </div>
)

export default AnecdoteList