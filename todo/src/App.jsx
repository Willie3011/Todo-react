import Calendar from './components/Calendar/Calendar'
import Todos from './components/Todos/Todos'
import AddTodo from './components/AddTodo/AddTodo'
import Totals from './components/Totals/Totals'

function App() {

  return (
    <div className='app'>
      <Calendar/>
      <Todos/>
      <Totals/>
    </div>
  )
}

export default App
