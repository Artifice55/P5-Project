import React, { useState } from 'react';
import logo from '../assets/PTH Logo.png'
import bg from '../assets/bg.svg'

function SignUpPage({ newPatient, setNewPatient }) {
    const [username, setName] = useState('');
    const [_password_hash, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [userType, setUserType] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [medical_id_num, setMedical_id_num] = useState('');
    const [isTherapist, setIsTherapist] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        const new_user = {
            username,
            _password_hash,
            phoneNumber,
            dateOfBirth,
            email,
            gender,
            userType,
            address,
            city,
            state,
            medical_id_num
        };
        
        
        let apiUrl = '/api/patients';
        if (isTherapist) {
            apiUrl = '/api/therapists';
        }
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_user)
        });
        if (res.ok) {
            const data = await res.json();
            setNewPatient(data);
            window.location.href = '/HomePage';
        } else {
            alert('Login has failed');
        }
        console.log("posted" + new_user);
    }

    return (
       <> 
        <img class="clouds" src={bg}/>

        <div className="signup">  
            <h1 className="h1Title">Power Through Healing</h1>
            <form className="SignUpForm" onSubmit={handleLogin}>
                <div className="textbox">
                <label >
                    Username:
                    <br/>
                    <input className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
               </div> 
               <div className="textbox">
                <label >
                    Password:
                    <br />
                    <input className="input"
                        type="password"
                        value={_password_hash}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                </div>
                <div className="textbox">
                <label>
                    Phone Number:
                    <br />
                    <input className="input"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        placeHolder="ex: 111-222-3333"
                    />
                </label>
                </div>
                <div className="textbox">
                <label>
                    Date of Birth:
            
                    <input className="input"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </label>
                </div>
                <div className="textbox">
                <label >
                    Email:
                    
                    <input className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                </div>
                <div className="textbox">
                <label >
                    Gender:
                    <br />
                    <input className="input"
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    />
                </label>
                </div>
                <div className="textbox">
                <label >
                    <b>Select one:</b>
                    <br />
                    <input className="Radioinput" type="radio" name="userType" value="Therapist" onChange={(e) => { setUserType(e.target.value); setIsTherapist(true); }} /> Therapist
                    <input className="Radioinput" type="radio" name="userType" value="Patient" onChange={(e) => { setUserType(e.target.value); setIsTherapist(false); }} /> Patient
                </label>
                {isTherapist &&
                    <>
                    <div className="textbox">
                        <label >
                            Address:
                            <br />
                            <input className="input"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </label>
                       </div> 
                       <div className="textbox">
                        <label >
                            City:
                            <br />
                            <input className="input"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </label>
                        </div>
                        <div className="textbox">
                        <label>
                            State:
                            <br />
                            <input className="input"
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </label>
                        </div>
                        <div className="textbox">
                        <label >
                            Medical ID #:
                            <br />
                            <input className="input"
                                type="text"
                                value={medical_id_num}
                                onChange={(e) => setMedical_id_num(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    </>
                }
                <button className='SignUpbutton' type="submit">Sign Up</button>
                <footer className="SignUpFooter">
                    Already have an account? Login <a href='/'>here</a>
                </footer>
              </div>
            </form>
        </div>
    </>
    )
}

export default SignUpPage;
