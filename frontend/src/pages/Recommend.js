import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar.js';

import { useAuth } from '../context/AuthContext.tsx';
import { useLocation } from 'react-router-dom';
import { HttpRequest, HTTP_METHODS } from '../services/ApiService.js';
import Alert from '../components/Alert.js';
import ExerciseCard from '../components/ExerciseCard.js';

export default function Recommend() {
  const { authState } = useAuth();
  const location = useLocation();
  const bodyPart = new URLSearchParams(location.search).get('train') || null;
  const [errors, setErrors] = useState({message: '', status: ''});
  const [exercises, setExercises] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (bodyPart) {
      window.history.replaceState(null, "", "/recommend")
      HttpRequest("/api/v1/exercises/recommend", HTTP_METHODS.POST, {"input": bodyPart})
      .then((response) => {
        if (response.success === 1) {
            setExercises(response.data);
        }else{
          setErrors({
            message: response.message,
            status: 'danger'
          })
        }
      });
    }
    else if(!authState.authenticated && !bodyPart){
        window.history.back();
    }
  }, [bodyPart, authState.authenticated]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    HttpRequest("/api/v1/exercises/recommend", HTTP_METHODS.POST, {"input": input})
    .then((response) => {
      if (response.success === 1) {
        setExercises(response.data);
      }else{
        setErrors({
          message: response.message,
          status: 'danger'
        })
      }
    });
  };

return (
    <>
    <Navbar active="Recommend" authenticated={authState.authenticated}/>
    {errors.message.length > 0 && <Alert message={errors.message} status={errors.status} />}
    <div className='register-container mt-5'>
        {authState.authenticated && (
            <>            
            <h3>Try some inputs for exercise recommendation</h3>
              <form onSubmit={handleSubmit} className='needs-validation d-flex w-100 justify-content-center align-items-center gap-4' >
                <input type='text' id='input' value={input} onChange={handleInputChange} className='form-control w-50' required/>
                <button type='submit' className='btn btn-outline-secondary'>Recommend Exercises</button>
              </form>
            </>
        )}
        <div className='container my-5'>
            {exercises && exercises.map((exercise, index) => (
                <ExerciseCard exercise={exercise} index={index} />
            ))}
        </div>
    </div>
    
    </>
  );
}
