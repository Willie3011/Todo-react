import React from 'react'
import './Totals.css'

function Totals() {
  return (
    <div className='totals'>
      <div className="total-tasks">
        <h2>Total Tasks</h2>
        <p>10</p>
      </div>
      <div className="total-in-progress">
        <h2>Total In Progress</h2>
        <p>5</p>
      </div>
      <div className="total-complete">
        <h2>Total Complete</h2>
        <p>5</p>
      </div>
      <div className="total-incomplete">
        <h2>Total Incomplete</h2>
        <p>5</p>
      </div>
    </div>
  )
}

export default Totals