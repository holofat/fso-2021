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

export const showNotification = (message, time) => {
  const visibilityTime = time * 1000
  return async dispatch => {
    dispatch({
      type: 'DISPLAY',
      data: message
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, visibilityTime)
  }
}

export default reducer