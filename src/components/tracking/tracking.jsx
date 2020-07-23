import React, {useState, useEffect}  from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../../redux/actions';
import Navbar from '../Navbar.js';
import './tracking.css';

function Tracking ({ currentUser }){

  useEffect(() => {
    fetch('http://localhost:3003/weight/' + currentUser.email, {
                    method:'get',
                    headers: {'Content-Type': 'application/json'},
    })
    .then (response=> response.json())
    .then (response=> console.log(response))
    // .then(response=> Promise.all(response.map(x =>
    //         fetch('http://localhost:3005/joker', {
    //             method:'post',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({
    //                 id: x.movie_id
    //             })}))))
    // .then(response => Promise.all(response.map(x => x.json())))
    // .then(response => {
    //     setMovies(response);
    //     console.log(response);
    // })
}, [])

    return(
        <div className="meal-container">
        <Navbar transparent className="meal-nav"/>
        <div
          className="absolute top-0 w-full h-full bg-gray-900 "
          style={{
            backgroundImage:
              "url(graph.jpg)",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        
        <div className=" container mx-auto px-4 h-full container-recipe" >
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full px-4">
              <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="container-form-recipe rounded-t mb-0 px-6 py-6 ">
                
        
      </div>
      </div>
      </div>
      </div>
      </div>

        )}
      
    </div>
         
          
       
          
          
          
   
    )
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect( mapStateToProps)(Tracking);