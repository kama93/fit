import React, {useState, useEffect}  from 'react';
import Table from 'react-bootstrap/Table';
import Navbar from '../Navbar.js';

import { cpmUser } from '../../redux/actions-cpm.jsx';
import { connect } from 'react-redux';

import './weekly.diet.css'

function WeeklyDiet ({cpmUser}){
    const [meal, setMeal]=useState();
    const [recipe, setRecipe]=useState();
    

    const checkMeal=()=>{
        fetch('http://localhost:3003/meal/' + cpmUser, {
                        method:'get',
                        headers: {'Content-Type': 'application/json'}
        })
        .then (response=> response.json())
        .then(response => setMeal(response.items.map(x => ({ ...x, 'value': JSON.parse(x.value)}))))
    }

    const checkRecipe=(x)=>{
      console.log(x);
      fetch('http://localhost:3003/recipe/' + x, {
                      method:'get',
                      headers: {'Content-Type': 'application/json'}
      })
      .then (response=> response.json())
      .then(response=>setRecipe(response.sourceUrl))
      // .then(response => setRecipe(response.items.map(x => ({ ...x, 'value': JSON.parse(x.value)}))))
  }

    const newPlan=()=>{
      setMeal('')
    }


    return(
       
        
        <div className="meal-container">
            <Navbar transparent className="meal-nav"/>
          
          
            <div
              className="absolute top-0 w-full h-full bg-gray-900 "
              style={{
                backgroundImage:
                  "url(blue.jpg)",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat"
              }}
            ></div>
             {meal?
             (<div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                    
                    <Table striped bordered hover>
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
      <td ><a href={recipe}><button onClick={()=>checkRecipe(meal[0].value.id)}>{meal[0].value.title}</button></a></td>
      <td>{meal[1].value.title}</td>
      <td>{meal[2].value.title}</td>
    </tr>
    <tr>
      <td className="table-font-size">Tuesday</td>
      <td>{meal[3].value.title}</td>
      <td>{meal[4].value.title}</td>
      <td>{meal[5].value.title}</td>
    </tr>
    <tr>
      <td className="table-font-size">Wednesday</td>
      <td>{meal[6].value.title}</td>
      <td>{meal[7].value.title}</td>
      <td>{meal[8].value.title}</td>
    </tr>
    <tr>
      <td className="table-font-size">Thursday</td>
      <td>{meal[9].value.title}</td>
      <td>{meal[10].value.title}</td>
      <td>{meal[11].value.title}</td>
    </tr>
    <tr>
      <td className="table-font-size">Friday</td>
      <td>{meal[12].value.title}</td>
      <td>{meal[13].value.title}</td>
      <td>{meal[14].value.title}</td>
    </tr>
    <tr>
      <td className="table-font-size">Saturday</td>
      <td>{meal[15].value.title}</td>
      <td>{meal[16].value.title}</td>
      <td>{meal[17].value.title}</td>
    </tr>
    <tr>
      <td className="table-font-size">Sunday</td>
      <td>{meal[18].value.title}</td>
      <td>{meal[19].value.title}</td>
      <td>{meal[20].value.title}</td>
    </tr>
  </tbody>
</Table>
<div className="container-button-new-plan"><button type="submit" className='button' onClick={()=>newPlan()}>New plan</button></div>
                  </div>
                </div>
              </div>
            </div>
            
            </div>):(<div className="container-meal"><button type="submit" className='button-meal' onClick={()=> checkMeal()}>Check your meal plan</button></div>)}
          
        </div>
   
    )
}

const mapStateToProps = state => ({
  cpmUser: state.cpm.cpmUser
});

export default connect(mapStateToProps)(WeeklyDiet);
// export default WeeklyDiet;