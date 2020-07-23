import React, {useState, useEffect}  from 'react';
import Navbar from '../Navbar.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './diner-wine.css'

function DinerWine (){
    const [wine, setWine]=useState();
    const checkDinner=()=>{
       console.log('bla')
    }

    const onWineCheck=(event)=> {
        setWine(event.target.value)
    }
    return(
        <div className="meal-container">
        <Navbar transparent className="meal-nav"/>
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
                <h3 className="dinner">No dinner idea? <br/>Click on button and check,<br/> plus you can get perfect wine parring.</h3>
                <Form className="form-dinner-wine">
                    <Form.Group className="form-dinner" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="add Wine paring" onChange={onWineCheck}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="button-dinner">
                        Check recipes
                    </Button>
                </Form>
                    
        
      </div>
      </div>
      </div>
      </div>
      </div>

        )}
      
    </div>
         
          
       
          
          
          
   
    )
}


export default DinerWine