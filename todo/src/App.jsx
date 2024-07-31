import { useState } from "react";
import Calendar from "./components/Calendar/Calendar";
import Todos from "./components/Todos/Todos";
import Totals from "./components/Totals/Totals";



function App() {
 const [dayClicked, setDayClicked] = useState("");


 const handledayClicked = (day) => {
  setDayClicked(day);
 }
  
  return (
    <div className="app">
      <Calendar handleDayClicked={handledayClicked}/>
      <Todos dayClicked={dayClicked}/>
      <Totals dayClicked={dayClicked}/>
    </div>
  );
}

export default App;
