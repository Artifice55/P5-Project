import React, { useState, useEffect } from 'react';
import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import './index.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import SignUpPage from './components/SignUpPage';
import Schedule from './components/Schedule';
import PopUp from './components/PopUp';
import { WavyContainer, WavyLink } from "react-wavy-transitions";



function App() {
  const [newPatient, setNewPatient] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [newAppointment, setNewAppointment] = useState({});
  const [appointments, setAppointments] = useState([]);

  const location = useLocation();

  const baseURL = "http://localhost:3000/services";

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    fetch(baseURL)
      .then(res => res.json())
      .then(data => setServiceData(data))
  }, []);

  const isLoginPage = location.pathname === '/';
  const isSignUpPage = location.pathname === '/SignUpPage'

  function addAppointment(newAppointment) {
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
  }

  return (
    <div>
      <WavyContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!isLoginPage && !isSignUpPage && ( 
                <nav className="ScheduleNavBar">
                  <WavyLink to="/HomePage" color="#ff44fd">
                    HomePage
                  </WavyLink>
                  <WavyLink direction="up" to="/Services" color="#8f44fd">
                    Services
                  </WavyLink>
                  <WavyLink duration={1000} to="/Schedule" color="#2f44fd">
                    Schedule
                  </WavyLink>
                  <WavyLink duration={1000} to="/" color="#2f44fd">
                    Logout
                  </WavyLink>
                </nav>
              )}
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<Login newPatient={newPatient} setNewPatient={setNewPatient} />} />
          <Route path="HomePage" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} addAppointment={addAppointment} appointments={appointments} setAppointments={setAppointments} />} />
          <Route path="Services" element={<ServicesPage serviceData={serviceData} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="SignUpPage" element={<SignUpPage newPatient={newPatient} setNewPatient={setNewPatient} />} />
          <Route path="Schedule" element={<Schedule currentUser={currentUser} setCurrentUser={setCurrentUser} newAppointment={newAppointment} setNewAppointment={setNewAppointment} addAppointment={addAppointment} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
