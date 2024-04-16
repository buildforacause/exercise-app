import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import { useAuth } from '../context/AuthContext.tsx';

export default function Logout() {
  const { authState, onLogout } = useAuth();
  const authenticated = authState.authenticated;
  useEffect(() => {
    if(!authenticated) {
        window.location.href = "/?logout=true";
    }
  }, [authenticated])
  const handleLogout = async () => {
    const response = await onLogout();
  }
  const handleBackPress = () => {
    window.history.back();
  }

return (
    <>
    <Navbar active="Join" authenticated={authState.authenticated} user={authState.user} />
    <div className='register-container mt-5'>
        <div className="h-100 p-5 bg-body-tertiary border rounded-3 mt-5">
            <h2>Do you really want to logout? </h2>
            <p>Your session would be terminated if you logout now.</p>
            <button onClick={handleLogout} className="btn btn-outline-danger" type="button">Yes, Logout</button>&nbsp;
            <button onClick={handleBackPress} className="btn btn-outline-success" type="button">No, Take me Back</button>
        </div>
    </div>
    
    </>
  );
}
