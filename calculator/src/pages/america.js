import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import 'react-dropdown/style.css';
import '../pages/calculator.css';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const America= () => {
  let navigate = useNavigate();
  const [st, setSt] = useState("")
  const [payPeriod, setPayPeriod] = useState("")
  const [income, setIncome] = useState("")
  const [year, setYear] = useState("");
  const [relation, setRelation] = useState("");
  const [taxResults, setTaxResults] = useState(null);
 


  useEffect(() => {
    console.log(payPeriod + income + year + st + relation)
  }, [payPeriod, income, year,st, relation])
  const todo = () => {
    navigate('/')
    
  }
  const submitPost = () => {
    var data = JSON.stringify({
      "income": income,
      "payPeriod": payPeriod,
      "year": year,
      "relation":relation,
      "province":st,
      "calculatorCountry":"America",
    });


    var config = {
      method: 'post',
      url: 'http://localhost:3001/api/america',
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
          <select name="selectList"  id="selectList" onChange={(e) => {
            setSt(e.target.value);
          }} >
            
          
            <option value="alb">Alabama</option>
            <option value="alk">Alaska</option>
            <option value="arz">Arizona</option>
            <option value="ark">Arkansas</option>
            <option value="clf">California</option>
            <option value="cod">Colorado</option>
            <option value="cont">Connecticut</option>
            <option value="dlw">Delaware</option>
            <option value="doc">District Of Columbia</option>
            <option value="fld">Florida</option>
            <option value="grg">Georgia</option>
            <option value="haw">Hawaii</option>
            <option value="ida">Idaho</option>
            <option value="ils">Illinois</option>
            <option value="ind">Indiana</option>
            <option value="iow">Iowa</option>
            <option value="kan">Kansas</option>
            <option value="ken">Kentucky</option>
            <option value="lsn">Louisiana</option>
            <option value="mai">Maine</option>
            <option value="mrl">Maryland</option>
            <option value="mst">Massachusetts</option>
            <option value="mic">Michigan</option>
            <option value="mins">Minnesota</option>
            <option value="misi">Mississippi</option>
            <option value="mso">Missouri</option>
            <option value="mont">Montana</option>
            <option value="neb">Nebraska</option>
            <option value="nevd">Nevada</option>
            <option value="nh">New Hampshire</option>
            <option value="nj">New Jersey</option>
            <option value="nm">New Mexico</option>
            <option value="ny">New York</option>
            <option value="ncl">North Carolina</option>
            <option value="ndk">North Dakota</option>
            <option value="oh">Ohio</option>
            <option value="okh">Oklahoma</option>
            <option value="org">Oregon</option>
            <option value="pslv">Pennsylvania</option>
            <option value="ri">Rhode Island</option>
            <option value="stc">South Carolina</option>
            <option value="std">South Dakota</option>
            <option value="tnc">Tennessee</option>
            <option value="tex">Texas</option>
            <option value="ut">Utah</option>
            <option value="vt">Vermont</option>
            <option value="vrgn">Virginia</option>
            <option value="wt">Washington</option>
            <option value="wv">West Virginia</option>
            <option value="wsn">Wisconsin</option>
            <option value="yom">Wyoming</option>

          </select>
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
          <h4 className='rs'>Relationship Status</h4>
          <div class="form__group">
            <input type="Radio" name='relation' value='single' onChange={(e) => { setRelation(e.target.value); }} />
            <label>Single</label>
          </div>
          <div class="form__group">
            <input type="Radio" name='relation' value='married' onChange={(e) => { setRelation(e.target.value); }} />
            <label>Married</label>
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

export default America