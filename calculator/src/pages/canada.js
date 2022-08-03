import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import 'react-dropdown/style.css';
import '../pages/calculator.css';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Canada = () => {
  let navigate = useNavigate();
  const [st, setSt] = useState("")
  const [payPeriod, setPayPeriod] = useState("")
  const [income, setIncome] = useState("")
  const [year, setYear] = useState("");
  const [taxResults, setTaxResults] = useState(null);
  const [expenses, setExpenses] = useState("")


  useEffect(() => {
    console.log(payPeriod + income + year + st + expenses)
  }, [payPeriod, income, year,st, expenses])
  const todo = () => {
    navigate('/')
    
  }
  const submitPost = () => {
    var data = JSON.stringify({
      "income": income,
      "payPeriod": payPeriod,
      "year": year,
      "expenses":expenses,
      "province":st,
      "calculatorCountry":"Canada",
    });


    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/canada',
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
            <label>Gross Income</label>
            <br />
            <input type="number" onChange={(e) => {
              setIncome(e.target.value);
            }}
            />
            </div>
            <br />
            <div class="form__group">
            <label>Expenses</label>
            <br />
            <input type="number" onChange={(e) => {
              setExpenses(e.target.value);
            }}
            />
            </div>
            <br />
            <div class="form__group">
            <label>Select Year</label>
            <br />
            <input type="number" min="2018" max="2022" step="1" placeholder='2019' onChange={(e) => {
              setYear(e.target.value);
            }} />
            </div>
            <br />
          


          <div class="form__group">
          <label>Select State/Province</label>
          <br />
          <select name="selectList" id="selectList" onChange={(e) => {
            setSt(e.target.value);
          }} >
            <option value="btc">British Columbia</option>
            <option value="que">Quebec</option>
            <option value="nwt">Northwest Territories</option>
            <option value="ont">Ontario</option>
            <option value="alb">Alberta</option>
            <option value="sas">Saskatchewan</option>
            <option value="man">Manitoba</option>
            <option value="yuk">Yukon</option>
            <option value="nab">Newfoundland and Labrador</option>
            <option value="nb">New Brunswick</option>
            <option value="ns">Nova Scotia</option>
            <option value="pai">Prince Edward Island</option>

          </select>
          </div>
       
            <br />
            <button className='button-84' onClick={submitPost} >Submit Post</button>
            <button className='button-83' onClick={todo} >return</button>
            <br />
            

          </div>

        
      </div>
      
           
      
    </div>
    
  )
}

export default Canada