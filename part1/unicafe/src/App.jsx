import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statisticline = ({text, value}) => {
  if (value == null) {
    return(
      <td>{'No feedback given'}</td>
    )
  }
  else {
    return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalFeedback = good + neutral + bad;

  const incrementGood = () => setGood(good + 1)
  const incrementBad = () => setBad(bad + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => incrementGood()} text={"good"} />
      <Button onClick={() => incrementNeutral()} text={"neutral"} />
      <Button onClick={() => incrementBad()} text={"bad"} />
      <h1>statistics</h1>
      {totalFeedback === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <Statisticline text="Good" value={good} /> 
          <Statisticline text="Neutral" value={neutral} /> 
          <Statisticline text="Bad" value={bad} />
          <Statisticline text="All" value={totalFeedback} />
          <Statisticline
            text="Average"
            value={totalFeedback === 0 ? null : (good - bad) / totalFeedback}
          /> 
          <Statisticline
            text="Positive"
            value={totalFeedback === 0 ? null : (good / totalFeedback) * 100 + " %"}
          /> 
        </table>
      )}
    </div>
  )
}

export default App