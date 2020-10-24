import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import { connect } from 'react-redux';

import Navbar from '../nav-bar/Navbar.jsx';

import './weekly.diet.css'

function WeeklyDiet({ cpmUser }) {
  const [meal, setMeal] = useState();

  useEffect(() => {
    if (cpmUser){
    // getting weekly diet plan base on user caloric need(caloric state in redux)
    weeklyPlan();
    }
  }
    , [cpmUser])

  const weeklyPlan = () =>{
    fetch('/api/meal/' + cpmUser, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(response => setMeal(response.items.map(x => ({ ...x, 'value': JSON.parse(x.value) }))))
  }

  const checkRecipe = (x) => {
    // getting URL to recipe
    fetch('/api/recipe/' + x, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(response => window.location.href = response.sourceUrl)
  }

  // allows to get new plan
  const newPlan = () => {
    weeklyPlan()
  }

  return (
    <PrintProvider>
      <NoPrint>
        <div className="meal-container">
          <Navbar transparent className="meal-nav" />
          <div
            className="absolute top-0 w-full h-full bg-gray-900 "
            style={{
              backgroundImage:
                "url(blue.png)",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          {meal ?
            (<div className="container mx-auto px-4 h-full" data-aos="fade-up" data-aos-delay="500">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                    <div className="rounded-t mb-0 px-6 py-6 mobile-table">
                      <Print single name="table diet">
                        <Table striped bordered hover >
                          <thead>
                            <tr>
                              <th></th>
                              <th className="table-font-size">Breakfast</th>
                              <th className="table-font-size">Lunch</th>
                              <th className="table-font-size">Dinner</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="table-font-size">Monday</td>
                              <td ><button onClick={() => checkRecipe(meal[0].value.id)}>{meal[0].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[1].value.id)}>{meal[1].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[2].value.id)}>{meal[2].value.title}</button></td>
                            </tr>
                            <tr>
                              <td className="table-font-size">Tuesday</td>
                              <td><button onClick={() => checkRecipe(meal[3].value.id)}>{meal[3].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[4].value.id)}>{meal[4].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[5].value.id)}>{meal[5].value.title}</button></td>
                            </tr>
                            <tr>
                              <td className="table-font-size">Wednesday</td>
                              <td><button onClick={() => checkRecipe(meal[6].value.id)}>{meal[6].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[7].value.id)}>{meal[7].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[8].value.id)}>{meal[8].value.title}</button></td>
                            </tr>
                            <tr>
                              <td className="table-font-size">Thursday</td>
                              <td><button onClick={() => checkRecipe(meal[9].value.id)}>{meal[9].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[10].value.id)}>{meal[10].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[11].value.id)}>{meal[11].value.title}</button></td>
                            </tr>
                            <tr>
                              <td className="table-font-size">Friday</td>
                              <td><button onClick={() => checkRecipe(meal[12].value.id)}>{meal[12].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[13].value.id)}>{meal[13].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[14].value.id)}>{meal[14].value.title}</button></td>
                            </tr>
                            <tr>
                              <td className="table-font-size">Saturday</td>
                              <td><button onClick={() => checkRecipe(meal[15].value.id)}>{meal[15].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[16].value.id)}>{meal[16].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[17].value.id)}>{meal[17].value.title}</button></td>
                            </tr>
                            <tr>
                              <td className="table-font-size">Sunday</td>
                              <td><button onClick={() => checkRecipe(meal[18].value.id)}>{meal[18].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[19].value.id)}>{meal[19].value.title}</button></td>
                              <td><button onClick={() => checkRecipe(meal[20].value.id)}>{meal[20].value.title}</button></td>
                            </tr>
                          </tbody>
                        </Table>
                      </Print>
                      <div className="container-button-new-plan"><Button variant="primary" type="submit" className="button button-weekly-diet" onClick={() => newPlan()}>New plan
                    </Button></div> </div>
                  </div>
                </div>
              </div>
            </div>) : (cpmUser == null && <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <h1>You needs first check you caloric intake on main page.<br />After that weekly meal plan should appears here automatically.</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </NoPrint>
    </PrintProvider>
  )
}

const mapStateToProps = state => ({
  cpmUser: state.cpm.cpmUser
});

export default connect(mapStateToProps)(WeeklyDiet);
