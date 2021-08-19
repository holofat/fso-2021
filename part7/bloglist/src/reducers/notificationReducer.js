const reducer = (state = null, action) => {
  switch(action.type){
    case 'DISPLAY':
      return action.data
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR',
  }
}

export const showNotification = (message, error) => {
  return async dispatch => {
    dispatch({
      type: 'DISPLAY',
      data: {message, error}
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }
}

export default reducer