import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../redux/actions';

import Popup from "reactjs-popup";

import './pop.css'

function Popups ({currentUser}){
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    let [bmi, setBmi] = useState('');
    let [info, setInfo]=useState('')

    useEffect(() => {
        if (currentUser)
        {fetch('http://localhost:3003/bmi/' + currentUser.email, {
                        method:'get',
                        headers: {'Content-Type': 'application/json'}
        })
        .then (response=> response.json())
        .then(response => {
            bmi= setBmi(response[0].bmi);  
            info= setInfo(response[0].info) 
        })}
    }, [currentUser])

    const checkBmi=()=>{
        console.log(bmi)
        if(!height || !weight){
            alert('Please fill form!')
        }

        if (height>100){
          setBmi(bmi = (weight/(Math.pow(height/100, 2))).toFixed(2))
        }
        else{
            setBmi(bmi = (weight/(Math.pow(height, 2))).toFixed(2))
        }
        if(bmi < 18.5){
            setInfo(info=('Underweight'))
        }
        else if(bmi<24.9 && bmi>=18.5){
            setInfo(info=('Normal weight'))
        }
        else if(bmi<29.9 && bmi>=24.9){
            setInfo(info=('Overweight'))
        }
        else{
            setInfo(info=('Obesity'))
        }
        if (currentUser)
        {fetch('http://localhost:3003/bmi', {
            method:'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: currentUser.email,
                bmi: bmi,
                info:info
            })
        })
        .then(response => response.json())
        .then(response=>console.log(response))}
    }

    const reset= ()=>{
        setBmi('');
        setInfo('')
    }


    return(
    <Popup
        trigger={
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center" data-aos="fade-right" data-aos-delay="1200">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg container-sector container-pop">
            <div className="px-4 py-5 flex-auto image-pop">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                <i className="fas fa-calculator"></i>
                </div>
                <h6 className="text-xl font-semibold">BMI</h6>
                <p className="mt-2 mb-4 text-gray-600">
                Calculate here your BMI and check what yours score means.
                </p>
            </div>
            <div className='overlay'>
            <div className='text'>Click here to check your BMI</div>
            </div>
            </div>
            </div>
        }
        modal
        closeOnDocumentClick
    >
        <div className='container-BMI'>
        {bmi}
        {bmi?(<div>
            {info}<br/>
            <button type="submit" className='button' onClick={()=> reset()}>Recheck</button>
            </div>):
            (<div>
                <div class="form-group">
                    <label for="height" class="form-label">Your height</label>
                    <input type="text" class="form-input" onChange={e => setHeight(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="website-url" class="form-label">Your weight</label>
                    <input type="text" class="form-input" onChange={e => setWeight(e.target.value)}/>
                </div>
                <button type="submit" className='button' onClick={()=> checkBmi()}>Check</button>
            </div>)}
        </div>
  </Popup>
       

    )
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect( mapStateToProps)(Popups);