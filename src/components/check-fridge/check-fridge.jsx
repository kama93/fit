import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion'
import Navbar from '../nav-bar/Navbar.js';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './check-fridge.css'

function Fridge() {
  const [fridge, setFridge] = useState();
  const [ingredientFirst, setIngredientFirst] = useState();
  const [ingredientSecond, setIngredientSecond] = useState();
  const [ingredientThird, setIngredientThird] = useState();
  const [ingredientFourth, setIngredientFourth] = useState();
  const [ingredientFifth, setIngredientFifth] = useState();
  const [recipe, setRecipe] = useState([]);


  const onFirstChange = (event) => {
    setIngredientFirst(event.target.value)
  }

  const onSecondChange = (event) => {
    setIngredientSecond(event.target.value)
  }

  const onThirdChange = (event) => {
    setIngredientThird(event.target.value)
  }

  const onFourthChange = (event) => {
    setIngredientFourth(event.target.value)
  }

  const onFifthChange = (event) => {
    setIngredientFifth(event.target.value)
  }

  const checkMealRecipe = () => {
    const ingredients = [ingredientFirst, ingredientSecond, ingredientThird,
                         ingredientFourth, ingredientFifth]
    fetch('http://localhost:3003/ingredients/' + ingredients.filter(x => !!x).join(","), {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => {
        setFridge(response)
        Promise.all(response.map(x =>
          fetch('http://localhost:3003/recipe/' + x.id, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          })))

          .then(response => Promise.all(response.map(x => x.json())))
          .then(response => {
            Promise.all(response.map(x =>
              fetch('http://localhost:3003/instructions/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  urls: x.sourceUrl,
                })
              })))
              .then(response => Promise.all(response.map(x => x.json())))
              .then(response => {
                setRecipe(response);
                console.log(response[0].instructions);
              })
          })
      })
  }



  return (
    <div className="meal-container">
      <Navbar transparent className="meal-nav" />
      <div
        className="absolute top-0 w-full h-full bg-grey "
        style={{
          backgroundImage:
            "url(fridge.jpg)",
          backgroundSize: 'cover',
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {fridge ?
        (<div className=" container mx-auto px-4 h-full container-recipe" >
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full px-4">
              <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="container-form-recipe rounded-t mb-0 px-6 py-6 ">

                  {fridge.map((x, i) => (
                    <Accordion defaultActiveKey="0">

                      <Card className="fridge-cart">
                        <Card.Header>

                          <Accordion.Toggle as={Button} variant="link" eventKey="1" className="fridge-title">
                            {x.title}

                          </Accordion.Toggle>
                        </Card.Header>

                        <Accordion.Collapse eventKey="1" className="fridge-insisde">

                          <div>
                            <img src={x.image} />
                            <ul>
                              {x.usedIngredients.map(ingredients =>
                                <li className="list-ingredients">
                                  {ingredients.originalString}
                                </li>)}
                            </ul>
                            <div>
                            <Accordion defaultActiveKey="0">
                                <Card className="fridge-cart">
                                  <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1" >
                                      Instructions
                                  </Accordion.Toggle>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey="1" className="">
                                    <pre className="instruction-textarea">{recipe.length != 0 && recipe[i].instructions}</pre></Accordion.Collapse>
                                </Card>
                              </Accordion>
                            </div>
                          </div>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>))}
                </div>
              </div>
            </div>
          </div>
        </div>) : (
          <div className=" container mx-auto px-4 h-full container-recipe" >
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full px-4">
                <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="container-form-recipe rounded-t mb-0 px-6 py-6 ">
                    <Form.Group>
                      <Form.Row>
                        <Col>
                          <Form.Control size="sm" type="text" placeholder="First ingredient" onChange={onFirstChange} />
                        </Col>
                      </Form.Row>
                      <br />
                      <Form.Row>
                        <Col>
                          <Form.Control size="sm" type="text" placeholder="Second ingredient" onChange={onSecondChange} />
                        </Col>
                      </Form.Row>
                      <br />
                      <Form.Row>
                        <Col>
                          <Form.Control size="sm" type="text" placeholder="Third ingredient" onChange={onThirdChange} />
                        </Col>
                      </Form.Row>
                      <br />
                      <Form.Row>
                        <Col>
                          <Form.Control size="sm" type="text" placeholder="Fourth ingredient" onChange={onFourthChange} />
                        </Col>
                      </Form.Row>
                      <br />
                      <Form.Row>
                        <Col>
                          <Form.Control className="ingredients" size="sm" type="text" placeholder="Fifth ingredient" onChange={onFifthChange} />
                        </Col>
                      </Form.Row>
                    </Form.Group>

                    <div className="container-recipe"><Button variant="primary" type="submit" className="button-fridge" onClick={() => checkMealRecipe()}>
                      Check recipes
                    </Button></div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        )}

    </div>

  )
}


export default Fridge;