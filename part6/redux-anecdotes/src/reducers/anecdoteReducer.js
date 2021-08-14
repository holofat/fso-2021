import anecdoteService from '../services/anecdotes'
const reducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_VOTE':
      return [...state]
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_VOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    anecdote.votes += 1
    await anecdoteService.vote(anecdote)
    const id = anecdote.id
    dispatch({
      type: 'ADD_VOTE',
      data: {id}
    })
  }
}


export default reducer