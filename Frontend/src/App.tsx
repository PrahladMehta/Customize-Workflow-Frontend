import React from 'react';
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginPage from "./pages/Login";
import SignupPage from './pages/Signup';

function App() {


  return (


    <div className="text-red-400">    

    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>  
        <Route path='/signup' element={<SignupPage></SignupPage>}></Route>  
      </Routes>
    
    </Router>

    </div>
  )
}

export default App
