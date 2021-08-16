import React from 'react'
import { useRouteMatch } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecd => anecd.id === match.params.id) : null
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote