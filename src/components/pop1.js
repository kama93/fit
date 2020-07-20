import React, {useState} from 'react';
import { Form, Radio } from 'semantic-ui-react'

import Popup from "reactjs-popup";

import './pop1.css'



function Pop (){
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [active, setActive] = useState('');
    let [ppm, setPpm] = useState('');
    let [cpm, setCpm]=useState('')


    const checkKcal=()=>{
        if(!height || !weight || !gender || !age){
            alert('Please fill form!')
        }
        if('Male'){
            
            setPpm(ppm=(66.47 + (13.75* weight) + (5* height) - (6.75* age)).toFixed(0));
            setCpm((ppm * active).toFixed(0));
        }
        else{
            setPpm(ppm=(665.09 + (9.56* weight) + (1.85* height) - (4.67* age)).toFixed(0));
            setCpm((ppm* active).toFixed(0));
        }

    }

    return(
    <Popup
    trigger={
        <div className="w-full md:w-4/12 px-4 text-center" data-aos="fade-up" data-aos-delay="1400">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg container-sector container-pop">
        <div className="px-4 py-5 flex-auto image-pop">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
            <i className="fas fa-balance-scale-right"></i>
            </div>
            <h6 className="text-xl font-semibold">
            Kcal calculator
            </h6>
            <p className="mt-2 mb-4 text-gray-600">
            Check here how much you should eat to get your goal- loose/ gain/ maintain your weight.
            </p>
        </div>
        <div className='overlay-blue'>
            <div className='text'>Check your daily kcal requirment</div>
            </div>
        </div>
        </div>
    }
    modal
    closeOnDocumentClick
    >
        <div className='container-kcal'>
        {ppm?(<div>
            <p>Your basal metabolic rate (BMR):<br/>{ppm}</p><br/>
            <p>Your total metabolic rate (TMR):<br/>{cpm}</p>
            
            </div>):
                (<div>
                    <div class="form-gender">
                    <Form.Field control={Radio} label="Male" checked={gender === 'Male'} value="Male" onClick={() => setGender('Male')} className='gender' />
                    <Form.Field control={Radio} label="Female" checked={gender === 'Female'} value="Female" onClick={() => setGender('Female')} className='gender'/>
                </div>
                <div class="form-group">
                    <label for="height" className="form-label">Your height (cm)</label>
                    <input type="text" className="form-input" onChange={e => setHeight(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="website-url" className="form-label">Your weight (kg)</label>
                    <input type="text" className="form-input" onChange={e => setWeight(e.target.value)}/>
                </div>
                <div class="form-group">
                    <label for="website-url" className="form-label">Your age</label>
                    <input type="text" className="form-input" onChange={e => setAge(e.target.value)}/>
                </div>
                <Form.Field label='Pick up your active level' control='select' onChange={e => setActive(e.target.value)}>
                    <option></option>
                    <option value='1.2'>for laying people</option>
                    <option value='1.4'>low active level, sitting work</option>
                    <option value='1.6'>medium active level, standing work</option>
                    <option value='1.75'>active live, regular exercices</option>
                    <option value='2'>high active level, everyday exercices</option>
                    <option value='2.4'>sportsman</option>
                </Form.Field>
                <button type="submit" className='button' onClick={()=>checkKcal()}>Check</button>
                </div>)}
        </div>
  </Popup>
       

    )
}

export default Pop