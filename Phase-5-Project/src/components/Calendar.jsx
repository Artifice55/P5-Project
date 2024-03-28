import React, { useState } from 'react';

// Calendar component
const Calendar = () => {
  const [events, setEvents] = useState({});

  // Function to add event to a specific date
  const addEvent = (date, event) => {
    setEvents(prevEvents => ({
      ...prevEvents,
      [date]: [...(prevEvents[date] || []), event]
    }));
  };

  // Function to remove event from a specific date
  const removeEvent = (date, index) => {
    setEvents(prevEvents => {
      const updatedEvents = [...prevEvents[date]];
      updatedEvents.splice(index, 1);
      return {
        ...prevEvents,
        [date]: updatedEvents
      };
    });
  };

  // Render calendar grid
  // You can adjust this to show different number of days, weeks, etc.
  const renderCalendar = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const calendarGrid = [];

    // Create grid cells for each day in the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dayOfWeek = date.getDay();
      const dateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

      calendarGrid.push(
        <div className="day" key={i}>
          <div>{days[dayOfWeek]}</div>
          <div>{i}</div>
          {/* Render events for this date */}
          {events[dateString] && events[dateString].map((event, index) => (
            <div key={index}>
              <span>{event}</span>
              <button onClick={() => removeEvent(dateString, index)}>Remove</button>
            </div>
          ))}
          {/* Add event form */}
          <input type="text" placeholder="Add event" onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addEvent(dateString, e.target.value);
              e.target.value = '';
            }
          }} />
        </div>
      );
    }

    return calendarGrid;
  };

  return (
    <div>
      <h2>Calendar</h2>
      <div className="calendar">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
