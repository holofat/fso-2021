const reducer = (state = null, action) => {
  switch(action.type){
    case 'FILTER':
      return action.data
    default:
      return state
  }
}

export const filter = (word) => ({
  type: 'FILTER',
  data: word,
})

export default reducer