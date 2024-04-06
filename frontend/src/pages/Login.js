import React, { useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar.js';
import { useAuth } from '../context/AuthContext.tsx';
import { HttpRequest, HTTP_METHODS } from '../services/ApiService.js';
import Alert from '../components/Alert.js';

export default function Login() {
  const { authState, onLogin } = useAuth();

  const [errors, setErrors] = useState({message: '', status: ''});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await onLogin({"username": username, "password": password});
    console.log(response);
    if(response.success === 1){
        setUsername('');
        setPassword('');
        window.location.href = '/';
    }else{
        setErrors({
            message: response.message,
            status: "danger"
        })
    }
  };
return (
    <>
    <Navbar active="Join" authenticated={authState.authenticated}/>
    {errors.message.length > 0 && <Alert message={errors.message} status={errors.status} />}
    <div className='register-container mt-5'>
        <div className='d-flex w-50 align-items-center py-4 px-4 card'>
            <main className="form-signin m-auto">
                <form class="needs-validation" onSubmit={handleSubmit} noValidate>
                    <h1 className="h3 mb-3 fw-normal">Please Login to continue</h1>
                    <div className="form-floating mb-2">
                        <input type="text" name='username' className="form-control" value={username} id="username" placeholder="eg: batman1234" onChange={handleUsernameChange} required/>
                        <label htmlFor="username">Username</label>
                        <div class="invalid-feedback">
                            Username cannot be empty!
                        </div>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" name='password' className="form-control" value={password} id="password" placeholder="Your Password" onChange={handlePasswordChange} required/>
                        <label htmlFor="password">Password</label>
                        <div class="invalid-feedback">
                            Password cannot be empty!
                        </div>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
                </form>
            </main>
        </div>

        <p className='text-black'>If you dont have an account <a href='/register'>Register here</a>.</p>
    </div>
    </>
  );
}
