import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/calculator.css';
import portuguese from'../photos/portuguese.jpg'
import newzealand from '../photos/newzealand.jpg'
import germany from '../photos/germany.png'
import france from '../photos/france.png'
import canada from '../photos/canada.png'
import usa from '../photos/usa.png'
import kenya from '../photos/Kenya.png'
import Roll from 'react-reveal/Roll';
const Country = () => {
    const [scale, setScale] = React.useState(false);
    let navigate = useNavigate();
    return (

        <div >
            <div className='mainContainer'>
            <div className='countrytext'><h4>Select your country</h4></div>
            
            <div className='countriescontainer'>
            
                
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/portugal")
                        }}>
                            <p className='imgText'>Portugal</p>
                            <img className='img' src={portuguese} />
                        </div>
                    </Roll>
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/newzealand")
                        }}>
                            <p className='imgText'>New Zealand</p>
                            <img className='img' src={newzealand} />
                        </div>
                    </Roll>
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/germany")
                        }}>
                            <p className='imgText'>Germany</p>
                            <img className='img' src={germany} />

                        </div>
                    </Roll>
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/france")
                        }}>
                            <p className='imgText'>France</p>
                            <img className='imgfrance' src={france} />

                        </div>
                    </Roll>
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/canada")
                        }}>
                            <p className='imgText'>Canada</p>
                            <img className='imgcanada' src={canada} />

                        </div>
                    </Roll>
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/kenya")
                        }}>
                            <p className='imgText'>Kenya</p>
                            <img className='img' src={kenya} />

                        </div>
                    </Roll>
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/america")
                        }}>
                            <p className='imgText'>America</p>
                            <img className='img' src={usa} />

                        </div>
                    </Roll>
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/america")
                        }}>
                            <p className='imgText'>America</p>
                            <img className='img' src={portuguese} />

                        </div>
                    </Roll>
                    <Roll left>
                        <div className='gridItem' onClick={() => {
                            navigate("/america")
                        }}>
                            <p className='imgText'>America</p>
                            <img className='img' src={portuguese} />

                        </div>
                    </Roll>




                


            </div>
            </div>
          


        </div>


    )
}

export default Country