import React, { useState } from 'react'

const Statistics = (props) => {
  const text = props.text
  const value = props.value

  
  return (
      <tr>
        <td>{text}</td>
        <td>{value}{props.add}</td>
      </tr>
  )
}

const Button = (props) => {
  return(
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setValue = (feedbackType) =>{
    if(feedbackType === 'good') setGood(good+1)
    if(feedbackType === 'neutral') setNeutral(neutral+1)
    if(feedbackType ==='bad') setBad(bad+1)
  }

  const all = good + bad + neutral

  let average = ((good * 1) + (bad * -1))/all
  average = isNaN(average) ? 0 : ((good * 1) + (bad * -1))/all

  let positive = (good/all) * 100
  positive = isNaN(positive) ? 0 : (good/all) * 100

  return (
    <table>
      <tbody>
        <tr>
          <td><h1>give feedback</h1></td>
        </tr>
        <tr>
          <td>
          <Button handleClick={() => setValue('good')} text='good'/>
          <Button handleClick={() => setValue('neutral')} text='neutral'/>
          <Button handleClick={() => setValue('bad')} text='bad'/>
          </td>
      </tr>
      <tr>
        <td><h1>statistics</h1></td>
      </tr>
          <Statistics text='good' value={good}/>
          <Statistics text='neutral' value={neutral}/>
          <Statistics text='bad' value={bad}/>
          <Statistics text='all' value={good + neutral + bad}/>
          <Statistics text='average' value={average}/>
          <Statistics text='positve' value={positive} add='%'/>
      </tbody>
    </table>
  )
}

export default App;
