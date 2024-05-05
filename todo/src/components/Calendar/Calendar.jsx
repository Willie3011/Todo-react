import React, {useState} from "react";
import "./Calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Calendar() {
  //Months Array
  const MonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  //Get the first day and total days in a month
  const getMonthDetails = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return{ firstDay, totalDays};
  }

  //create calendar grid
  const calendarGrid = () => {
    const {firstDay, totalDays} = getMonthDetails(currentMonth, currentYear);
    const calendar = []
    let dayCount = 0;

    for(let i = 0; i < firstDay; i++){
      calendar.push(<div key={`prev-${i}`}></div>)
    }

    for(let i = 1; i <= totalDays; i++){
      dayCount += 1;
      const isToday = currentDate.getDate() === i && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();
      console.log(isToday);
      calendar.push(
        <div key={`day-${i}`} className={`day${isToday? " today" : ""}`} onClick={() => console.log(`Clicked on day ${i}`)}> {i}</div>
      );
    }
    console.log(totalDays);
    return calendar;
  }


  const prevMonth = () => {
    if(currentMonth === 0){
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
      return;
    }
    else{
      setCurrentMonth(currentMonth - 1);
    }
  }

  const nextMonth = () => {
    if(currentMonth === 11){
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
      return;
    }
    else{
      setCurrentMonth(currentMonth + 1);
    }
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="month">
          <span className="month-name">{MonthNames[currentMonth]}</span>
          <span className="year">{currentYear}</span>
        </div>
        <div className="cal-btns">
          <button className="prev-btn" onClick={prevMonth}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextMonth}>
            <FaChevronRight />
          </button> 
        </div>
    </div>
    <div className="weekdays">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        <div className="days">
          {calendarGrid()}

      </div>
    </div>
  );
}


export default Calendar;
