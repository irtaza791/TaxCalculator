import React, { Component }  from 'react';
import Calculator from '../src/pages/calculation'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Country from './pages/countriesPage';
import NewZealand from './pages/newzealand';
import Result from './pages/results';
import Germany from './pages/germany';
import '../src/pages/calculator.css';
import Roll from 'react-reveal/Roll';
import Flip from 'react-reveal/Flip';


function App() {
  return (
    <Router>
      
      <div>
        
        
        
        
        <Flip right cascade >
        <h1 className='mainheading' >Tax Calculator</h1>
        </Flip>
      </div>
      <Routes>
          <Route path='/portugal' element={<Calculator />} />
          <Route path='/' element={<Country />} />
          <Route path='/newzealand' element={<NewZealand />} />
          <Route path='/result' element={<Result />} />
          <Route path='/germany' element={<Germany />} />
      </Routes>
    </Router>
    
  );
}

export default App;
