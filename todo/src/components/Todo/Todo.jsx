import React, { useState } from 'react'
import './Todo.css'
import { FaCheck } from "react-icons/fa";

function Todo() {
  const [checked, setChecked] = useState(false);


  const handleChecked = () => {
    setChecked(!checked);
  }


  return (
    <div className='todo'>
      <div className="left">
        <h3 className='task-header'>Complete Project</h3>
        <p className='task-desc'>
          Finish implementing the task Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, iure!
        </p>
      </div>
      <div className="right">
        <label htmlFor="done" className="check" >
          <input type="checkbox" name="done" id="done" />
          <span className={checked=== true ? 'radio checked' : 'radio'} onClick={handleChecked}>{checked===true ? <FaCheck className='icon'/> : ""}</span>
        </label>
      </div>
    </div>
  )
}

export default Todo