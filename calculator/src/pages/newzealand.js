import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../pages/calculator.css';
import Axios from 'axios'
//import { Typography } from '@material-ui/core';
//import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';
const NewZealand = () => {
  let navigate = useNavigate();
  const [payPeriod, setpayPeriod] = useState("")
  const [income, setIncome] = useState("")
  const [taxCredit, setTaxCredit] = useState("");
  const [year, setYear] = useState("");
  const [taxResults, setTaxResults] = useState(null);
  const [expenses, setExpenses] = useState("")

  const submitPost = () => {
    var data = JSON.stringify({
      "income": income,
      "payPeriod": payPeriod,
      "year": year,
      "expenses": expenses,
      "taxCredit": taxCredit,
      "calculatorCountry":"NewZealand",
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/nz',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    Axios(config)
      .then(function (response) {
        //console.log((response.data));
        setTaxResults((response.data));
        navigate('/result',{state: {response:response.data,request:JSON.parse(data)}});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
  
    <div className='body'>
      <div className='container'>
          <div className='uploadPost'>
            <h4>Pay Period</h4>
            <div class="form__group">
            <input type="Radio" name='payPeriod' value='Yearly' onChange={(e) => {
              setpayPeriod(e.target.value);
            }}
            />
            <label>Yearly</label>
            </div>
            <div class="form__group">
            <input type="Radio" name='payPeriod' value='Monthly' onChange={(e) => {
              setpayPeriod(e.target.value);
            }}
            />
            <label>Monthly</label>
            </div>
            <br />
            <div class="form__group">
            <label>Gross Income</label>
            <br />
            <input type="text" onChange={(e) => {
              setIncome(e.target.value);
            }}
            />
            </div>
         
            
            <br />
            <div class="form__group">
            <label>Select Year</label>
            <br />
            <input type="number" min="2019" max="2023" step="1" placeholder='2019' onChange={(e) => {
              setYear(e.target.value);
            }} />
            </div>
            <br />
            <div class="form__group">
            <label>Tax Credit</label>
            <br />
            <input type="number" onChange={(e) => {
              setTaxCredit(e.target.value);
            }}
            />
            <br />
            </div>
            <div class="form__group">
            <label>Deductable Expenses</label>
            <br />
            <input placeholder="Your Email" type="text" onChange={(e) => {
              setExpenses(e.target.value);
            }}
            />
            </div>


            <br />
            <button onClick={submitPost} >Submit Post</button>
            <br />
            
            


          </div>

        
      </div>
      
           
      
    </div>
    
  )
}

export default NewZealand