import React from 'react';
import ServiceCard from './ServiceCard';
import logo from '../assets/PTH Logo.png'
import { useNavigate } from 'react-router-dom';


function ServicesPage( { serviceData, currentUser, setCurrentUser}) {
    const navigate = useNavigate();


    function handleClick() {
        navigate('/HomePage');
    }

    function handleLogout() {
        setCurrentUser(null)
        fetch('/logout', { method: 'DELETE' })
        navigate('/')
    }
    
    function handleButtonClick() {
        navigate('/Schedule')
    }
    
    return (
        <div>
            
            <div style={{
                display: "flex", justifyContent: "center",  alignitems: "center", height: "60px"
                }}>
                    <img
                    onClick={handleClick} 
                    src={logo} 
                    alt="Power Through Healing" 
                    width={80}
                    height={
                    "auto"}
                    style={{ cursor: "pointer"}}
                    />
            </div>
    
            <div className="card-container">
                { serviceData.map(service => <ServiceCard key={service.id} service={service} /> )}
            </div>        
        
            <header>
                <h1>The many services of Power Through Healing</h1>
            </header>
            
        
        </div>
    )
}


export default ServicesPage