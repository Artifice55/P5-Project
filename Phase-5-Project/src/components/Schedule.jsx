import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp from './PopUp';
import Logo from '../assets/PTH Logo.png';
import axios from 'axios';

function Schedule({ currentUser, setCurrentUser, newAppointment, setNewAppointment, addAppointment }) {
    console.log(addAppointment)  
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);

    function handleClick() {
        navigate('/HomePage');
    }

    function handleLogout() {
        setCurrentUser(null);
        fetch('/logout', { method: 'DELETE' });
        navigate('/');
    }

    function handleHomePageClick(params) {
        navigate('/HomePage');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const new_appointment = {
            name,
            phoneNumber,
            date,
            startTime,
            endTime
        };

        
        addAppointment(new_appointment);

    
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new_appointment)
            });
            if (res.ok) {
                const data = await res.json();
                setNewAppointment(data);
                console.log(data)
            } else {
                alert('Scheduling has failed');
            }

            await axios.post('/api/appointments', { phoneNumber: phoneNumber });
            console.log('SMS confirmation sent successfully');
        } catch (error) {
            console.error('Error sending SMS confirmation:', error);
        }
        setShowPopUp(true);
    };

    function handleClosePopup() {
        setShowPopUp(false);
    }

    return (
        <>
            <div>
                <div style={{
                    display: "flex", justifyContent: "center", alignitems: "center", height: "60px"
                }}>
                    <img
                        onClick={handleClick}
                        src={Logo}
                        alt="Power Through Healing"
                        width={80}
                        height={"auto"}
                        style={{ cursor: "pointer" }}
                    />
                </div>

                <div className="scheduleForm-container">
                    <h2>Schedule an Appointment!</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

                        <label>Phone Number:</label>
                        <input type="text" id="phone_number" name="phone_number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />

                        <label htmlFor="start_time">Start Time:</label>
                        <input type="time" id="start_time" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

                        <label htmlFor="end_time">End Time:</label>
                        <input type="time" id="end_time" name="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

                        <button type="submit">Schedule Appointment</button>
                    </form>
                {showPopUp && <PopUp onClose={handleClosePopup} />}
                </div>
            </div>
        </>
    );
}

export default Schedule;
