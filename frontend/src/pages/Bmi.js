import React, { useState } from 'react';
import '../App.css';
import Navbar from '../components/Navbar.js';

import { useAuth } from '../context/AuthContext.tsx';

export default function BMI() {
  const { authState } = useAuth();
  const [feedback, setFeedback] = useState({bmi: '', text: '', remarks: ''});
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const getBMI = (weight, height) => {
    let bmi = (weight / (height * height)) * 10000
    let text = "";
    let remarks = "";
    if (bmi < 18.5){
        text = "warning"
        remarks = "Underweight"
    }
    if (18.5 < bmi < 25){
        text = "success"
        remarks = "Healthy"
    }
    if (25 < bmi < 30){
        text = "warning"
        remarks = "Overweight"
    }
    if (bmi >= 30){
        text = "danger"
        remarks = "Obese"
    }
    return [bmi.toFixed(2), text, remarks]
  } 

  const checkFloat = (num) => {
    const isFloat = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
    return isFloat.test(num);
  };

  const handleHeightChange = (event) => {
    if(checkFloat(event.target.value)){
        setHeight(event.target.value)
    }
  }

  const handleWeightChange = (event) => {
    if(checkFloat(event.target.value)){
        setWeight(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = getBMI(weight, height);
    setFeedback({
        bmi: data[0],
        text: data[1],
        remarks: data[2]
    });
  }
  

return (
    <>
    <Navbar active="BMI" authenticated={authState.authenticated}/>
    <div className="container my-5">
        <h2>Enter the details!</h2>
        <hr />
        <form className="needs-validation" onSubmit={handleSubmit} >
            <div className="mb-3 col-md-4 col-lg-4">
                <label for="weight" className="form-label">Tell Us Your Weight <span className="text-muted">(in kgs)</span></label>
                <input placeholder="eg: 65.20" type="number" step="any" className="form-control" value={weight} onChange={handleWeightChange} id="weight" name="weight" required />
                <div className="invalid-feedback">
                    Weight cannot be empty!
                </div>
            </div>
            <div className="mb-3 col-md-4 col-lg-4">
                <label for="height" className="form-label">Tell Us Your Height <span className="text-muted">(in cms)</span></label>
                <input placeholder="eg: 120.67" type="number" step="any" className="form-control" value={height} onChange={handleHeightChange} id="height" name="height" required />
                <div className="invalid-feedback">
                    Height cannot be empty!
                </div>
            </div>
        <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
        <hr />
        {feedback.bmi && (
            <>
                <h3>Results:</h3>
                <hr/>
                <h4>Your BMI is: <span class={"text-" + feedback.text}>{feedback.bmi}</span></h4>
                <p className="text-muted">This indicates you are <span class={"text-decoration-underline text-" + feedback.text}>{ feedback.remarks }.</span> You can try out exercises from our <a className="text-secondary text-decoration-underline" href="/picker">exercise picker</a>!!</p>
            </>
        )}
    </div>
    
    </>
  );
}

