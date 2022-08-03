import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import '../pages/calculator.css';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
//import { Typography } from '@material-ui/core';
//import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
const Ireland = () => {
  let navigate = useNavigate();
  const [relation, setRelation] = useState("")
  const [payPeriod, setPayPeriod] = useState("")
  const [age, setAge] = useState("")
  const [income, setIncome] = useState("")
  const [year, setYear] = useState("");
  const [taxResults, setTaxResults] = useState(null);

  useEffect(() => {
    console.log(relation + income + year )
  }, [relation, income, year])
  const todo = () =>{
    navigate('/');

  }
  const submitPost = () => {
    var data = JSON.stringify({
      "income": income,
      "relation": relation,
      "payPeriod":payPeriod,
      "age": age,
      "year": year,
      "calculatorCountry":"Ireland",
    });


    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/germany',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    Axios(config)
      .then(function (response) {
        // console.log((response.data));
        setTaxResults((response.data));
        //navigate("/result");
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

            <br />
            <div class="form__group">
            <label>Select Year</label>
            <br />
            <input type="number" min="2019" max="2022" step="1" placeholder='2019' onChange={(e) => {
              setYear(e.target.value);
            }} />
            </div>
            <br />



            <h4 className='rs' >Relationship Status</h4>
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
          <h4 className='rs'>Pay Period</h4>
          <div class="form__group">
            <input type="Radio" name='payperiod' value='Hourly' onChange={(e) => { setPayPeriod(e.target.value); }} />
            <label>Hourly</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='payperiod' value='Daily' onChange={(e) => { setPayPeriod(e.target.value); }} />
            <label>Daily</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='payperiod' value='Monthly' onChange={(e) => { setPayPeriod(e.target.value); }} />
            <label>Monthly</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='payperiod' value='Yearly' onChange={(e) => { setPayPeriod(e.target.value); }} />
            <label>Yearly</label>
          </div>
          <br />


          <br />
            <div class="form__group">
            <label>Gross Income</label>
            <br />
            <input type="number" onChange={(e) => {
              setIncome(e.target.value);
            }}
            />
            </div>


            <br />
            <div class="form__group">
            <label>Age (IN Years)</label>
            <br />
            <input type="number" onChange={(e) => {
              setAge(e.target.value);
            }}
            />
            </div>
            
            
            <br />
            <button className='button-84' onClick={submitPost} >Calculate</button>
            <button  className='button-83'  onClick={todo} >return</button>
            <br />
          </div>

        
      </div>
      
           
      
    </div>
    
  )
}

export default Ireland