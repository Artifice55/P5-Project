import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/PTH Logo.png';
import Schedule from './Schedule';

function HomePage({ currentUser, setCurrentUser, addAppointment, appointments, setAppointments }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/HomePage');
    }

    function handleLogout() {
        setCurrentUser(null);
        fetch('/api/logout', { method: 'DELETE' });
        navigate('/');
    }

    function addAppointment(newAppointment) {
        fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAppointment),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to add appointment');
  })
  .then(data => {
    setAppointments(prevAppointments => [...prevAppointments, data]);
  })
  .catch(error => {
    console.error('Error adding appointment:', error);
  });
}

    return (
        <div>
            <nav>
                <div style={{
                    display: "flex", justifyContent: "center", alignitems: "center", height: "60px"
                }}>
                    <img
                        onClick={handleClick}
                        src={logo}
                        alt="Controller in Hand"
                        width={80}
                        height={"auto"}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </nav>
            <div className="calendar-container">
                {/* <Calendar /> */}
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ff3bff&showTitle=0&src=bWFyaW9hbnRvbjlAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237986CB&color=%2333B679&color=%230B8043" style= {{border:"solid 1px #777"}} width="800" height="600" frameBorder="0" scrolling="no"></iframe>

                <ol>
                     <h2>Your Sessions</h2> 
                    {/* Render appointments from the list */}
                    {appointments.map((appointment, index) => (
                        <li key={index}>{appointment.name} at {appointment.date} from {appointment.startTime} to {appointment.endTime}</li>
                    ))}
                </ol>
            </div>
            <p>Additional content below the calendar.</p>
        </div>
    );
}

export default HomePage;
