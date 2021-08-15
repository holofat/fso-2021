import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    const query = event.target.value
    props.filter(query)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}/>
    </div>
  )
}

const mapDispatchToProps = {
  filter
}

const connectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default connectedFilter