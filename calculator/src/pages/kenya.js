import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import 'react-dropdown/style.css';
import '../pages/calculator.css';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Kenya = () => {
  let navigate = useNavigate();
  const [cB, setCB] = useState("")
  const [payPeriod, setPayPeriod] = useState("")
  const [income, setIncome] = useState("")
  const [year, setYear] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [workStatus, setWorkStatus] = useState("");
  const [disability, setDisability] = useState("");
  const [taxResults, setTaxResults] = useState(null);
  const [insurance, setInsurance] = useState("")
  const [hOwner, setHOwner] = useState("");


  useEffect(() => {
    console.log(payPeriod + income + year + cB + royalties + workStatus + disability + insurance + hOwner)
  }, [payPeriod, income, year, cB, royalties, workStatus, disability, insurance, hOwner])
  const todo = () => {
    navigate('/')

  }
  const submitPost = () => {
    var data = JSON.stringify({
      "income": income,
      "payPeriod": payPeriod,
      "year": year,
      "royalties": royalties,
      "cb": cB,
      "workstatus": workStatus,
      "disability": disability,
      "insurance": insurance,
      "houseOwner": hOwner,
      "calculatorCountry": "Kenya",
    });


    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/kenya',
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
        navigate('/result', { state: { response: response.data, request: JSON.parse(data) } });
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
            <input type="number" min="2018" max="2022" step="1" placeholder='2019' onChange={(e) => {
              setYear(e.target.value);
            }} />
          </div>

          <br />
          <h4 className='rs'>Pay Period</h4>
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
            <label>Gross Income (In KES)</label>
            <br />
            <input type="number" onChange={(e) => {
              setIncome(e.target.value);
            }}
            />
          </div>
          <br />
          <br />
          <div class="form__group">
            <label>Contribution Benefit (In KES)</label>
            <br />
            <input type="number" onChange={(e) => {
              setCB(e.target.value);
            }}
            />
          </div>
          <br />
          <br />
          <h4 className='rs'>Royalties</h4>
          <div class="form__group">
            <input type="Radio" name='royalties' value='resident' onChange={(e) => { setRoyalties(e.target.value); }} />
            <label>Resident</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='royalties' value='nonresident' onChange={(e) => { setRoyalties(e.target.value); }} />
            <label>Non-Resident</label>
          </div>
          <br />
          <br />
          <h4 className='rs'>Work Status</h4>
          <div class="form__group">
            <input type="Radio" name='workstatus' value='employee' onChange={(e) => { setWorkStatus(e.target.value); }} />
            <label>Employees</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='workstatus' value='selfemployment' onChange={(e) => { setWorkStatus(e.target.value); }} />
            <label>Self Employment</label>
          </div>
          <br />

          <br />
          <h4 className='rs'>Do YOU HAVE DISABILITY?</h4>
          <div class="form__group">
            <input type="Radio" name='disability' value='yes' onChange={(e) => { setDisability(e.target.value); }} />
            <label>Yes</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='disability' value='no' onChange={(e) => { setDisability(e.target.value); }} />
            <label>No</label>
          </div>
          <br />

          <br />
          <h4 className='rs'>DO YOU HAVE INSURANCE?</h4>
          <div class="form__group">
            <input type="Radio" name='insurance' value='yes' onChange={(e) => { setInsurance(e.target.value); }} />
            <label>Yes</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='insurance' value='no' onChange={(e) => { setInsurance(e.target.value); }} />
            <label>No</label>
          </div>
          <br />

          <br />
          <h4 className='rs'>ARE YOU HOME OWNER HIP?</h4>
          <div class="form__group">
            <input type="Radio" name='houseOwner' value='yes' onChange={(e) => { setHOwner(e.target.value); }} />
            <label>Yes</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='houseOwner' value='no' onChange={(e) => { setHOwner(e.target.value); }} />
            <label>No</label>
          </div>
          <br />

          <br />
          <button className='button-84' onClick={submitPost} >Submit Post</button>
          <button className='button-83' onClick={todo} >return</button>
          <br />




        </div>


      </div>



    </div>

  )
}

export default Kenya