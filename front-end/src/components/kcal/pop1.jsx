import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Popup from "reactjs-popup";
import { connect } from 'react-redux';

import { fetchWithToken } from '../../api'
import { setUserCpm } from '../../redux/actions-cpm.jsx';

import './pop1.css'

function Pop({ currentUser, setUserCpm }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [active, setActive] = useState('');
  let [ppm, setPpm] = useState('');
  let [cpm, setCpm] = useState('');

  useEffect(() => {
    if (currentUser)
    // getting calories info value from detabase
    {
      fetchWithToken('/api/calories/' + currentUser.email, currentUser.fitToken, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(response => {
        if (response.length === 0) {
          setPpm('');
          setCpm('');
          setUserCpm(null)
        }
        else {
          ppm = setPpm(response[0].ppm);
          cpm = setCpm(response[0].cpm);
          setUserCpm(response[0].cpm)
        }
      })
    }
  }, [currentUser])

  // calories calculation
  const checkKcal = () => {
    if (!height || !weight || !gender || !age) {
      alert('Please fill form!')
    }
    else {
      if ('Male') {

        setPpm(ppm = (66.47 + (13.75 * weight) + (5 * height) - (6.75 * age)).toFixed(0));
        setCpm(cpm = (ppm * active).toFixed(0));
      }
      else {
        setPpm(ppm = (665.09 + (9.56 * weight) + (1.85 * height) - (4.67 * age)).toFixed(0));
        setCpm(cpm = (ppm * active).toFixed(0));
      }
      setUserCpm(cpm)
      if (currentUser) {
        fetchWithToken('/api/calories', currentUser.fitToken, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: currentUser.email,
            cpm: cpm,
            ppm: ppm
          })
        })
        .then(response => response.json())
        .then(response => console.log(response))
        if (ppm === undefined) {
          setPpm('');
          setCpm('')
        }
      }
    }
  }

  // set calories to empty string, so user can recheck that
  const reset = () => {
    setCpm('');
    setPpm('')
  }

  return (
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
        {ppm ? (<div>
          <p>Your basal metabolic rate (BMR):<br />{ppm}</p><br />
          <p>Your total metabolic rate (TMR):<br />{cpm}</p><br />
          <Button variant="primary" type="submit" className="button-bmi" onClick={() => reset()}>
            Recheck
        </Button>
        </div>) :
          (<div>
            <div class="container-kcal">
              <Form.Group>
                <Form.Row>
                  <Col sm={10}>
                    <div className="form-gender">
                      <Form.Check
                        type="radio"
                        label="Male"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        value="Male"
                        onChange={e => setGender(e.target.value)}
                      />
                      <Form.Check
                        type="radio"
                        label="Female"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        value="Female"
                        onChange={e => setGender(e.target.value)}
                      /></div>
                  </Col>
                </Form.Row>
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
                <br />
                <Form.Row>
                  <Col>
                    <Form.Control size="sm" type="text" placeholder="Your age" onChange={e => setAge(e.target.value)} />
                  </Col>
                </Form.Row>
                <br />
                <Form.Row className="choose-option">
                  <Col xs="auto" className="my-1">
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      id="inlineFormCustomSelect"
                      custom
                      onChange={e => setActive(e.target.value)}
                    >
                      <option value="0">Choose your fitness level</option>
                      <option value="1.2">Low active level, sitting job</option>
                      <option value="1.3">Sitting work, exercices 1/2 a week</option>
                      <option value="1.5">Sitting work, exercices 3/4 a week</option>
                      <option value="1.8">physical work, exercices 3/4 a week</option>
                      <option value="2">Sportsman</option>
                    </Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>
            </div>
            <Button variant="primary" type="submit" className="button-kcal" onClick={() => checkKcal()}>
              Check
            </Button>
          </div>)
        }
      </div>
    </Popup>
  )
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setUserCpm: cpm => dispatch(setUserCpm(cpm))
})

export default connect(mapStateToProps, mapDispatchToProps)(Pop);
