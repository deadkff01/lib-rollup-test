import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)
  const updateVendor = () => {
    const newCount = count + 1
    setCount(newCount)
  }

  return (
    <div>
      <h1>Hello Rollup</h1>
      <h3>{count}</h3>
      <button type="button" onClick={updateVendor}>
        +
      </button>
    </div>
  )
}

export default App
