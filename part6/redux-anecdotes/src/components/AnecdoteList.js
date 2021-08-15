import React from 'react'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => _.reverse(_.sortBy(state.anecdote, 'votes')))
  const filteredAnecdotes = anecdotes.reduce((r, o) => {
    if(filter !== null) {
      if(o.content.toLowerCase().includes(filter.toLowerCase())){
        return r.concat({
          id: o.id,
          content: o.content,
          votes: o.votes
        })
      }
      return r
    } else{
      return anecdotes
    }
    
  }, [])
  //const anecdoteList = filter !== null ? filteredAnecdotes:anecdotes
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
  }
  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList