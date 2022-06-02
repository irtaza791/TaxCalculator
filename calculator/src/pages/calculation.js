import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import '../pages/calculator.css';
import Axios from 'axios'
//import { Typography } from '@material-ui/core';
//import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';
const Calculator = () => {
  const [relation, setRelation] = useState("")
  const [income, setIncome] = useState("")
  const [taxCredit, setTaxCredit] = useState("");
  const [year, setYear] = useState("");
  const [taxResults, setTaxResults] = useState(null);
  const [expenses, setExpenses] = useState("")
  useEffect(() => {
    console.log(relation + income + year + taxCredit + expenses)
  }, [relation, income, year, taxCredit, expenses])
  const submitPost = () => {
    var data = JSON.stringify({
      "income": income,
      "relation": relation,
      "year": year,
      "expenses": expenses,
      "taxCredit": "800"
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    Axios(config)
      .then(function (response) {
        // console.log((response.data));
        setTaxResults((response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
  
    <div className='body'>
      <div className='container'>
          <div className='uploadPost'>
            <h4>Relationship Status</h4>
            <div class="form__group">
            <input type="Radio" name='relation' value='Married' onChange={(e) => {
              setRelation(e.target.value);
            }}
            />
            <label>Married</label>
            </div>
            <div class="form__group">
            <input type="Radio" name='relation' value='Single' onChange={(e) => {
              setRelation(e.target.value);
            }}
            />
            <label>Single</label>
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
            <input type="number" min="2019" max="2022" step="1" placeholder='2019' onChange={(e) => {
              setYear(e.target.value);
            }} />
            </div>
            <br />
            <div class="form__group">
            <label>Tax Credit</label>
            <br />
            <input type="number" value="800" />
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
            

            {taxResults && <div>{taxResults?.data}</div>}
          </div>

        
      </div>
      
           
      
    </div>
    
  )
}

export default Calculator