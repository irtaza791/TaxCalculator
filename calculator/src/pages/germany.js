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
const Germany = () => {
  let navigate = useNavigate();
  const [relation, setRelation] = useState("")
  const [income, setIncome] = useState("")
  const [year, setYear] = useState("");
  const [taxResults, setTaxResults] = useState(null);

  useEffect(() => {
    console.log(relation + income + year )
  }, [relation, income, year])
  const todo = () => {
    submitPost();
    
  }
  const submitPost = () => {
    var data = JSON.stringify({
      "income": income,
      "relation": relation,
      "year": year,
      "calculatorCountry":"Germany",
    });


    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/portugal',
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
            
            <br />
            <button onClick={todo} >Submit Post</button>
            <br />
          </div>

        
      </div>
      
           
      
    </div>
    
  )
}

export default Germany