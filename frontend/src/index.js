import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './pages/Register';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import BMI from './pages/Bmi.js';
import Picker from './pages/Picker.js';
import Recommend from './pages/Recommend.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={<App />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/bmi' element={<BMI />} />
        <Route path='/picker' element={<Picker />} />
        <Route path='/recommend' element={<Recommend />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
