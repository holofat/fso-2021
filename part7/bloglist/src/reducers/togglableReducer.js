const reducer = (state = null, action) => {
  switch(action.type){
    case 'SHOW':
      return action.data
    case 'HIDE':
      return null
    default:
      return state
  }
}

export const show = () => {
  return {
    type: 'SHOW',
    data: true
  }
}

export const hide = () => {
  return{
    type: 'HIDE'
  }
}

export default reducer