import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Navbar from '../nav-bar/Navbar.jsx';

import './diner-wine.css'

function DinerWine() {
  const [wine, setWine] = useState('');
  const [dinner, setDinner] = useState();
  const [proposal, setProposal] = useState(false);


  const onWineCheck = (e) => {
    setWine(e.target.value)
  }

  const checkDinner = () => {
    // getting random recipe
    let count = 0
    fetch('/api/random/' + 'dinner', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => {
        if(count>3 && wine){
          setProposal(true)
        }
        else{
        if (response.recipes[0].winePairing.innerText) {
          return setDinner(response.recipes[0]);
        }
        else {
          count++
          return checkDinner()
        }
      }
      })
  }

  return (
    <div className="meal-container">
      <Navbar transparent className="meal-nav" />
      <div
        className="absolute top-0 w-full h-full bg-gray-900 "
        style={{
          backgroundImage:
            "url(diner.jpg)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      <div className=" container mx-auto px-4 h-full container-recipe" >
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full px-4">
            <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="container-form-recipe rounded-t mb-0 px-6 py-6 ">
                {proposal ? (<div><h3 className="dinner-form"> Unfortunatelly no diner ideas for today :( <br />Maybe it's time to go to resturant,<br /> Or order some sushi.</h3></div>) : (<div> {dinner ?
                  (<div className="wine-dinner-container">
                    <img src={dinner.image} alt="recipe" />
                    <h1 className="dinner">{dinner.title}</h1>
                    <a href={dinner.spoonacularSourceUrl}>Recipe here</a>
                    <br />
                    <br />
                    {wine ?
                      (<div>
                        <h1 className="wine">Wine to pick up to this dish</h1>
                        <p>{dinner.winePairing.pairingText}</p></div>) : (<div></div>
                      )}
                  </div>) :
                  (<div>
                    <h3 className="dinner-form">No dinner idea? <br />Click on button and check,<br /> plus you can get perfect wine parring.</h3>
                    <div className="container-dinner">
                      <Form className="form-dinner-wine">
                        <Form.Group className="form-dinner" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="add Wine paring" onChange={onWineCheck} />
                        </Form.Group>
                      </Form>
                      <Button variant="primary" type="submit" onClick={() => checkDinner()} >
                        Click here for recipe
                    </Button>
                    </div>
                  </div>)}
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default DinerWine