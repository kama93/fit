import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { currentUser } from '../../redux/actions';

import './pop.css'

function Popups({ currentUser }) {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    let [bmi, setBmi] = useState('');
    let [info, setInfo] = useState('')
    // looking if any past BMIs available
    useEffect(() => {
        if (currentUser) {
            fetch('http://localhost:3003/bmi/' + currentUser.email, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(response => {
                    if (response.length === 0) {
                        setBmi('');
                        setInfo('')
                    } else {
                        bmi = setBmi(response[0].bmi);
                        info = setInfo(response[0].info)
                    }

                })
        }
    }, [currentUser])

    // calculate BMI, checking if both inputs filled, also adding commend base on BMI level
    const checkBmi = () => {
        console.log(bmi)
        if (!height || !weight) {
            alert('Please fill form!');
            setBmi('');
            setInfo('')

        }

        if (height > 100) {
            setBmi(bmi = (weight / (Math.pow(height / 100, 2))).toFixed(2))
        }
        else {
            setBmi(bmi = (weight / (Math.pow(height, 2))).toFixed(2))
        }
        if (bmi < 18.5) {
            setInfo(info = ('Underweight'))
        }
        else if (bmi < 24.9 && bmi >= 18.5) {
            setInfo(info = ('Normal weight'))
        }
        else if (bmi < 29.9 && bmi >= 24.9) {
            setInfo(info = ('Overweight'))
        }
        else {
            setInfo(info = ('Obesity'))
        }
        if (currentUser) {
            // adding BMI to detabse
            fetch('http://localhost:3003/bmi', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: currentUser.email,
                    bmi: bmi,
                    info: info
                })
            })
                .then(response => response.json())
                .then(response => console.log(response))
        }
        if (weight) {
            // adding weight to database
            fetch('http://localhost:3003/weight', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: currentUser.email,
                    weight: weight
                })
            })
                .then(response => response.json())
                .then(response => console.log(response))
        }
    }

    // for user to recheck BMI, setting bmi and info state to emmpty values
    const reset = () => {
        setBmi('');
        setInfo('')
    }


    return (
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
                {bmi ? (<div>
                    {info}<br />
                    <Button variant="primary" type="submit" className="button-bmi" onClick={() => reset()}>
                        Recheck
        </Button>
                </div>) :
                    (<div>
                        <div class="form-group">
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <Form.Control size="sm" type="text" placeholder="Your height" onChange={e => setHeight(e.target.value)} />
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Row>
                                    <Col>
                                        <Form.Control size="sm" type="text" placeholder="Your weight" onChange={e => setWeight(e.target.value)} />
                                    </Col>
                                </Form.Row>

                                <Button variant="primary" type="submit" className="button-bmi" onClick={() => checkBmi()}>
                                    Check BMI
                                </Button>

                            </Form.Group>


                        </div>
                    </div>
                    )}
            </div>
        </Popup>


    )
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Popups);