import {useState} from "react"

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [point, setPoint] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0})

  const [selected, setSelected] = useState(0)

  const addVote = () => {
    point[selected] += 1
    setPoint({...point})
  }

  const nextVote = () => {
    setSelected(selected+1)
    if(selected === 6){
      setSelected(0)
    }
  }

  const sortable = Object.keys(point).sort((a,b) => point[a]-point[b])
  const mostVote = sortable[6]
  console.log(mostVote)
  console.log(sortable)
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {point[selected]} votes</p>
      <button onClick={() => addVote()}>vote</button>
      <button onClick={() => nextVote()}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVote]}</p>
      <p>has {point[mostVote]} votes</p>
    </div>
  );
}

export default App;
