import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import logo from '../assets/PTH Logo.png'


function SignUpPage( { newPatient, setNewPatient}) {
    const navigate = useNavigate()
    const [username, setName] = useState('');
    const [_password_hash, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [userType, setUserType] = useState('');
    
    async function handleLogin(e) {
        e.preventDefault()
        const new_patient = {
            username,
            _password_hash,
            phoneNumber,
            dateOfBirth,
            email,
            gender,
            userType
        }
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_patient)
        });
        if (res.ok) {
            const data = await res.json()
            setNewPatient(data)
            window.location.href = '/HomePage'
        } else {
            alert('Login failed')
        }
       console.log("posted" + new_patient)   
    }

    function handleClick(s) {
        navigate('/SignUpPage')
    }


    
    return (
    <>
    <body className="LoginBody">
        <div>
            
            <div className="background"></div>
            <div className="card centered">
            <img className="logo" src={logo} />
            <h2>Power Through Healing</h2>
            <h2>Welcome Back</h2>
            <form className="form"onSubmit={handleLogin} > 
                <label className="label">
                    <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    />
              </label>
                <label className="label">
                    <input 
                    type="password"
                    placeholder="Password"
                    value={_password_hash}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button className='button' type="submit"> Login </button>
                
                <footer>
                        Need an account? Sign up <a href='/SignUpPage'>here</a>
                </footer>
            </form>
        </div>
    </div>
</body>
</>
)
}


export default SignUpPage