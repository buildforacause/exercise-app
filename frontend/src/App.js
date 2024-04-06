import './App.css';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext.tsx';
import { useLocation } from 'react-router-dom';
import Alert from './components/Alert.js';
import React, {useEffect} from 'react';

export default function App() {
  const { authState } = useAuth();

  const location = useLocation();
  const isLogoutTrue = new URLSearchParams(location.search).get('logout') === 'true';

  useEffect(() => {
    if (isLogoutTrue) {
      window.history.replaceState(null, "", "/")
    }
  }, [isLogoutTrue]);

  return (
    <div className="main">
      <Navbar active="Home" authenticated={authState.authenticated} />
      {isLogoutTrue && <Alert message={"Logged Out Successfully!"} status={"success"}/> }
      <img src={process.env.PUBLIC_URL + '/fitness.png'} alt="Fitness" />
    </div>
  );
}

