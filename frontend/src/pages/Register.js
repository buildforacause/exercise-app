import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import { useAuth } from '../context/AuthContext.tsx';
import { HttpRequest, HTTP_METHODS } from '../services/ApiService.js';
import Alert from '../components/Alert.js';

export default function Register() {
  const { authState } = useAuth();

  const [errors, setErrors] = useState({message: '', status: ''});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticated = authState.authenticated;
  useEffect(() => {
    if(authenticated) {
       window.location.href = '/';
    }
  }, [authenticated])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    HttpRequest("/api/v1/auth/register", HTTP_METHODS.POST, {"username": username, "password": password})
    .then((response) => {
      if (response?.success === 1) {
        setUsername('');
        setPassword('');
        setErrors({
          message: response?.message ? response.message : "Something went wrong",
          status: 'success'
        })
      }else{
        setErrors({
          message: response?.message ? response.message : "Something went wrong",
          status: 'danger'
        })
      }
    });
  };

return (
    <>
    <Navbar active="Join" authenticated={authState.authenticated} user={authState.user} />
    {errors.message.length > 0 && <Alert message={errors.message} status={errors.status} />}
    <div className='register-container mt-5'>
        <div className='d-flex custom-width align-items-center py-4 px-4 card'>
            <main className="form-signin m-auto">
                <form className="needs-validation" onSubmit={handleSubmit} >
                    <h1 className="h3 mb-3 fw-normal">Please Register to continue</h1>

                    <div className="form-floating mb-2">
                        <input type="text" name='username' className="form-control" value={username} id="username" placeholder="eg: batman1234" onChange={handleUsernameChange} required/>
                        <label htmlFor="username">Username</label>
                        <div className="invalid-feedback">
                            Username cannot be empty!
                        </div>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" name='password' className="form-control" value={password} id="password" placeholder="Your Password" onChange={handlePasswordChange} required/>
                        <label htmlFor="password">Password</label>
                        <div className="invalid-feedback">
                            Password cannot be empty!
                        </div>
                    </div>

                    <button className="btn btn-secondary w-100 py-2" type="submit">Join Us</button>
                </form>
            </main>
        </div>

        <p className='text-black'>If you already have an account <a href='/login'>Login here</a>.</p>
    </div>
    
    </>
  );
}
