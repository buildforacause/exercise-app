import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext.tsx';
import { Link, useLocation } from 'react-router-dom';
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
    <>
    <div className="main">
      <Navbar active="Home" authenticated={authState.authenticated} user={authState.user} />
      {isLogoutTrue && <Alert message={"Logged Out Successfully!"} status={"success"}/> }
      <div className="container-fluid col-md-10 px-2 py-0">
        <div className="row flex-lg-row-reverse align-items-center g-3 py-0">
          <div className="col-10 col-sm-8 col-md-6">
            <img src={process.env.PUBLIC_URL + '/fitness.png'} className="d-block mx-lg-auto img-fluid" alt="exercise" width="700" height="500" />
          </div>
          <div className="col-md-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Exercise Recommendation made easier</h1>
            <p className="lead">Now, you can directly use our exercise picker or custom inputs for getting recommendations of the exercises you want to do at your home or at the gym. </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to={"/register"} className="btn btn-secondary btn-lg px-4 me-md-2">Sign Up</Link>
              <Link to={"/picker"} className="btn btn-outline-secondary btn-lg px-4">Try the picker</Link>
            </div>
          </div>
        </div>
      </div>
      <hr className='container' />

      <div className='register-container mb-5'>
        <h1 className='mb-4'>Our Features</h1>

        <div className='row container d-flex align-items-center justify-content-center gap-5'>

          <div className="card col-md-4" style={{width: "22rem"}}>
            <img src={process.env.PUBLIC_URL + "/body.png"} className="card-img-top" alt="picker" width="auto" height="266px" />
            <div className="card-body">
              <h5 className="card-title">Exercise Picker</h5>
              <p className="card-text">Select a particular body target area and get recommendations of the exercises.</p>
              <Link to={"/picker"} className="btn btn-secondary">Try it out</Link>
            </div>
          </div> 

          <div className="card col-md-4" style={{width: "22rem"}}>
            <img src={process.env.PUBLIC_URL + "/recommend.png"} className="card-img-top" alt="recommend" width="auto" height="266px" />
            <div className="card-body">
              <h5 className="card-title">Recommendations {! authState.authenticated && (<small className='text-danger fs-6'>(Login required)</small>)}</h5>
              <p className="card-text">Get recommendations based on your inputs. <strong>For example: only abs workout</strong>.</p>
              <Link to={authState.authenticated ? "/recommend" : "/login"} className="btn btn-secondary">Try it</Link>
            </div>
          </div> 

          <div className="card col-md-4" style={{width: "22rem"}}>
            <img src={process.env.PUBLIC_URL + "/bmi.png"} className="card-img-top" alt="bmi" width="auto" height="266px" />
            <div className="card-body">
              <h5 className="card-title">BMI Calculator</h5>
              <p className="card-text">Want to know if you are healthy or overweight? Try our BMI calculator.</p>
              <Link to={"/bmi"} className="btn btn-secondary">Try it</Link>
            </div>
          </div>  
        </div>
      </div>
    </div>

    
    </>
  );
}

