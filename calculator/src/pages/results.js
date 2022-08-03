import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer , Tooltip, Label} from 'recharts';
import '../pages/calculator.css';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
//import { Typography } from '@material-ui/core';
//import { Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';





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
      
    <h4  style={{textAlign:"center", color:"white"}}>Tax Report</h4>
    <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
    {<div className='taxReport'><div> Country of tax: </div><div className='resulttext'>{state.request.calculatorCountry }</div></div>}
    {<div className='taxReport'><div> Year of tax: </div><div className='resulttext'>{state.request.year}</div></div>}
    {<div className='taxReport'><div> Relation Status: </div><div className='resulttext'>{state.request.relation}</div></div>}
    {<div className='taxReport'><div> Gross Income: </div><div className='resulttext'>{state.request.income}</div></div>}
    {<div className='taxReport'><div> Deductable Expenses: </div><div className='resulttext'>{state.request.expenses}</div></div>}
    {<div className='taxReport'><div> Tax Credit: </div><div className='resulttext'>{state.request.taxCredit}</div></div>}
    {<div className='taxReport'><div> Tax to pay: </div><div className='resulttext1'>{state.response.data}</div></div>}
    <div style={{borderBottom:"1px solid white", marginBottom:"10px"}}></div>
    
   
    
  </div>;
  }else if(report == "NewZealand"){
    taxReport = <div>
   <h4  style={{textAlign:"center", color:"white"}}>Tax Report</h4>
   <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
    {<div className='taxReport'> <div >Country of tax:</div><div className='resulttext'> {state.request.calculatorCountry }</div></div>}
    {<div className='taxReport'> <div>Year of tax:</div><div className='resulttext'> {state.request.year}</div></div>}
    {<div className='taxReport'> <div>Pay  Period:</div><div className='resulttext'> {state.request.payPeriod} </div></div>}
    {<div className='taxReport'> <div>Gross income:</div><div className='resulttext'> {state.request.income}</div></div>}
    {<div className='taxReport'> <div>Deductable Expenses:</div><div className='resulttext'> {state.request.income}</div></div>}
    {<div className='taxReport'> <div>Tax Credit:</div><div className='resulttext'> {state.request.income}</div></div>}
    {<div className='taxReport'> <div>Tax to pay:</div><div className='resulttext1'> {state.response.data}</div></div>}
    <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
  </div>;

  }else if(report == "Germany"){
    taxReport = <div>
    <h4  style={{textAlign:"center", color:"white"}}>Tax Report</h4>
    <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
     {<div className='taxReport'> <div >Country of tax:</div><div className='resulttext'> {state.request.calculatorCountry }</div></div>}
     {<div className='taxReport'> <div>Year of tax:</div><div className='resulttext'> {state.request.year}</div></div>}
     {<div className='taxReport'><div> Relation Status: </div><div className='resulttext'>{state.request.relation}</div></div>}
     {<div className='taxReport'> <div>Gross income:</div><div className='resulttext'> {state.request.income}</div></div>}

  
     {<div className='taxReport'> <div>Tax to pay:</div><div className='resulttext1'> {state.response.data}</div></div>}
     <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
   </div>;
    

  }else if (report == "France"){
    taxReport = <div>
    <h4  style={{textAlign:"center", color:"white"}}>Tax Report</h4>
    <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
     {<div className='taxReport'> <div >Country of tax:</div><div className='resulttext'> {state.request.calculatorCountry }</div></div>}
     {<div className='taxReport'> <div>Year of tax:</div><div className='resulttext'> {state.request.year}</div></div>}
     {<div className='taxReport'><div> Relation Status: </div><div className='resulttext'>{state.request.relation}</div></div>}
     {<div className='taxReport'><div> Pay Period: </div><div className='resulttext'>{state.request.payPeriod}</div></div>}
     {<div className='taxReport'><div> Work Status: </div><div className='resulttext'>{state.request.workStatus}</div></div>}
     {<div className='taxReport'><div> No of Child/Dependent: </div><div className='resulttext'>{state.request.dependent}</div></div>}
     {<div className='taxReport'> <div>Gross income:</div><div className='resulttext'> {state.request.income}</div></div>}
     {<div className='taxReport'> <div>Tax to pay:</div><div className='resulttext1'> {state.response.data}</div></div>}
     <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
   </div>;
    

  }else if ( report == "Canada"){
    let pr = ""
    if(state.request.province == "sas"){
      pr = "Saskatchewan"
    }else if(state.request.province == "btc"){
      pr = "British Columbia"

    }else if(state.request.province == "que"){
      pr = "Québec"
      
    }else if(state.request.province == "nwt"){
      pr = "Northwest Territories"
      
    }else if(state.request.province == "ont"){
      pr = "Ontario"
      
    }else if(state.request.province == "alb"){
      pr = "Alberta"
      
    }else if(state.request.province == "man"){
      pr = "Manitoba"
      
    }else if(state.request.province == "yuk"){
      pr = "Yukon"
      
    }
    else if(state.request.province == "nab"){
      pr = "Newfoundland & Labrador"
      
    }
    else if(state.request.province == "nb"){
      pr = "New Brunswick"
      
    }
    else if(state.request.province == "ns"){
      pr = "Nova Scotia"
      
    }
    else if(state.request.province == "pai"){
      pr = "Prince Edward Island"
    }
   
    taxReport = <div>
    <h4  style={{textAlign:"center", color:"white"}}>Tax Report</h4>
    <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
     {<div className='taxReport'> <div >Country of tax:</div><div className='resulttext'> {state.request.calculatorCountry }</div></div>}
     {<div className='taxReport'> <div >State/Province:</div><div className='resulttext'> {pr }</div></div>}

     {<div className='taxReport'><div> Deductable Expenses </div><div className='resulttext'>{state.request.expenses}</div></div>}
     {<div className='taxReport'> <div>Gross income:</div><div className='resulttext'> {state.request.income}</div></div>}
     {<div className='taxReport'> <div>Tax to pay:</div><div className='resulttext1'> {state.response.data}</div></div>}
     <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
   </div>;

  }else if(report == "Kenya"){
    taxReport =     <div>
    <h4  style={{textAlign:"center", color:"white"}}>Tax Report</h4>
    <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
     {<div className='taxReport'> <div >Country of tax:</div><div className='resulttext'> {state.request.calculatorCountry }</div></div>}
     {<div className='taxReport'> <div>Year of tax:</div><div className='resulttext'> {state.request.year}</div></div>}
     {<div className='taxReport'><div> Gross Income </div><div className='resulttext'>{state.request.income}</div></div>}
     {<div className='taxReport'><div> Pay Period: </div><div className='resulttext'>{state.request.payPeriod}</div></div>}
     {<div className='taxReport'><div> Work Status: </div><div className='resulttext'>{state.request.workstatus}</div></div>}
     {<div className='taxReport'><div> No of Child/Dependent: </div><div className='resulttext'>{state.request.insurance}</div></div>}
     {<div className='taxReport'> <div>Gross income:</div><div className='resulttext'> {state.request.disability}</div></div>}
     {<div className='taxReport'> <div>Tax to pay:</div><div className='resulttext1'> {state.response.data}</div></div>}
     <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
   </div>;
  }else if(report == "America"){
    taxReport =     <div>
    <h4  style={{textAlign:"center", color:"white"}}>Tax Report</h4>
    <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
     {<div className='taxReport'> <div >Country of tax:</div><div className='resulttext'> {state.request.calculatorCountry }</div></div>}
     {<div className='taxReport'> <div>Year of tax:</div><div className='resulttext'> {state.request.year}</div></div>}
     {<div className='taxReport'><div> Gross Income </div><div className='resulttext'>{state.request.income}</div></div>}
     {<div className='taxReport'><div> Pay Period: </div><div className='resulttext'>{state.request.payPeriod}</div></div>}
     {<div className='taxReport'><div> Province </div><div className='resulttext'>{state.request.province}</div></div>}
     {<div className='taxReport'><div> Relation status </div><div className='resulttext'>{state.request.relation}</div></div>}
     {<div className='taxReport'> <div>Tax to pay:</div><div className='resulttext1'> {state.response.data}</div></div>}
     <div style={{borderBottom:"1px solid white", marginBottom:"20px"}}></div>
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
        <button className='button-84' onClick={todo}>Return to home</button>
        
        <br />
        
      </div>
      

     
      
      
    </div>
    
  )
}

export default Calculator