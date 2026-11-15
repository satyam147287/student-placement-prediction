
import { useState } from 'react'
import './App.css'

function App() {
  const [cgpa, setCgpa] = useState('')
  const [iq, setIq] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

const handlePredict = async () => {

  // Empty input check
  if (cgpa === '' || iq === '') {
    setResult('Please enter both CGPA and IQ')
    return
  }

  const cgpaValue = Number(cgpa)
  const iqValue = Number(iq)

  // CGPA validation
  if (cgpaValue < 1 || cgpaValue > 10) {
    setResult('CGPA must be between 1 and 10')
    return
  }

  // IQ validation
  if (iqValue < 50 || iqValue > 100) {
    setResult('IQ must be between 50 and 100')
    return
  }

  // Loading start
 try {
  setLoading(true)

  const response = await fetch('http://127.0.0.1:8000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cgpa: cgpaValue,
      iq: iqValue,
    }),
  })

  if (!response.ok) {
  throw new Error('API request failed')
}

  const data = await response.json()

console.log("Backend Result:", data.prediction)

setResult(data.prediction)

} catch (error) {
  setResult('Backend server error. Please try again.')

} finally {
  setLoading(false)
}

} //handlepredict function yahan closer hoga
  

  return (
    <div>
      <div className="top-tag">
  ✨ AI POWERED PREDICTION
</div>
      <h1>Student Placement Prediction</h1>
      <p className="subtitle">
  Predict your placement chances using CGPA and IQ
</p>

      <div className="input-group">
  <label>Enter CGPA:</label>
        <input
          type="number"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          placeholder="Enter CGPA"
        />
      </div>

      <div className="input-group">
  <label>Enter IQ:</label>
        <input
          type="number"
          value={iq}
          onChange={(e) => setIq(e.target.value)}
          placeholder="Enter IQ"
        />
      </div>

     <button
  type="button"
  onClick={handlePredict}
  disabled={loading}
>
  {loading ? 'Predicting...' : 'Predict Placement'}
</button>

     {result && (
  <div className={`result-card ${
    result === 'Placed'
      ? 'success'
      : result === 'Not Placed'
      ? 'failure'
      : 'error'
  }`}>
    <h2>{result}</h2>
    <p>
  {result === 'Placed'
    ? 'Congratulations! You are likely to get placed.'
    : result === 'Not Placed'
    ? 'Keep improving your skills. You can do it!'
    : result}
</p>
  </div>
)}
    </div>
  )
}

export default App
