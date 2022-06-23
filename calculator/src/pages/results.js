import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import '../pages/calculator.css';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
//import { Typography } from '@material-ui/core';
//import { Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
const Calculator = () => {
  let navigate = useNavigate();
  const {state} = useLocation()
  useEffect(() => {
    console.log(state)
  }, [state])

  let  report  = state.request.calculatorCountry ;
  console.log(report)
  let taxReport;

  if (report == "Portugal") {
    taxReport = <div >
    <h4 className='rs'>Tax Report</h4>
    {<div className='taxReport'><div> Country of tax: </div><div className='resulttext'>{state.request.calculatorCountry }</div></div>}
    {<div className='taxReport'><div> Year of tax: </div><div className='resulttext'>{state.request.year}</div></div>}
    {<div className='taxReport'><div> Relation Status: </div><div className='resulttext'>{state.request.relation}</div></div>}
    {<div className='taxReport'><div> Gross Income: </div><div className='resulttext'>{state.request.income}</div></div>}
    {<div className='taxReport'><div> Deductable Expenses: </div><div className='resulttext'>{state.request.expenses}</div></div>}
    {<div className='taxReport'><div> Tax Credit: </div><div className='resulttext'>{state.request.taxCredit}</div></div>}
    {<div className='taxReport'><div> Tax to pay: </div><div className='resulttext1'>{state.response.data}</div></div>}
  </div>;
  }else if(report == "NewZealand"){
    taxReport = <div className='taxReport'>
    <h4>Tax Report</h4>
    {<div> <h5>Country of tax:</h5> {state.request.calculatorCountry }</div>}
    {<div> <h5>Year of tax:</h5> {state.request.year}</div>}
    {<div> <h5>Pay  Period:</h5> {state.request.payPeriod} </div>}
    {<div> <h5>Gross income:</h5> {state.request.income}</div>}
    {<div> <h5>Deductable Expenses:</h5> {state.request.income}</div>}
    {<div> <h5>Tax Credit:</h5> {state.request.income}</div>}
    {<div> <h5>Tax to pay:</h5> {state.response.data}</div>}
  </div>;

  }
   else {
    taxReport = <h4>Something not working</h4>;
  }
  const todo = () => {
    navigate('/')


  };



  
  return (
  
    <div className='body'>
      <div className='container'>
        {taxReport}
        <button className='button-84' onClick={todo}>Back to home</button>
      </div>
    </div>
    
  )
}

export default Calculator