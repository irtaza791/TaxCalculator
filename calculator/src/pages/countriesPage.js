import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/calculator.css';
import portuguese from'../photos/portuguese.jpg'
import newzealand from '../photos/newzealand.jpg'
const Country = () => {
    let navigate = useNavigate();
    return (
        <div>
            <div>countriesPage</div>
            <div className='countriescontainer'>
            <div className='gridItem' onClick={() => {
                        navigate("/portugal")
                    }}>
                    <p className='imgText'>Portugal</p>
                    <img  className='img' src={portuguese}/>


                </div>
                <div className='gridItem' onClick={() => {
                        navigate("/portugal")
                    }}>
                    <p className='imgText'>New Zealand</p>
                    <img  className='img' src={newzealand}/>

                </div>
                <div className='gridItem' onClick={() => {
                        navigate("/portugal")
                    }}>
                    <p className='imgText'>Portugal</p>
                    <img  className='img' src={portuguese}/>

                </div>

                <div className='gridItem' onClick={() => {
                        navigate("/portugal")
                    }}>
                    <p className='imgText'>Portugal</p>
                    <img  className='img' src={portuguese}/>

                </div>
                <div className='gridItem' onClick={() => {
                        navigate("/portugal")
                    }}>
                   <p className='imgText'>Portugal</p>
                    <img  className='img' src={portuguese}/>

                </div>
                <div className='gridItem' onClick={() => {
                        navigate("/portugal")
                    }}>
                    <p className='imgText'>Portugal</p>
                    <img  className='img' src={portuguese}/>

                </div>
                <div className='gridItem' onClick={() => {
                        navigate("/portugal")
                    }}>
                    <p className='imgText'>Portugal</p>
                    <img  className='img' src={portuguese}/>

                </div>

                


            </div>

        </div>


    )
}

export default Country