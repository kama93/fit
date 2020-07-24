import React, {useState, useEffect}  from 'react';
import Popup from "reactjs-popup";


import './pop2.css'


function Pops (){
        let [air, setAir]=useState('');
        let [weather, setWeater]=useState([]);
  useEffect(() => {
    fetch('http://localhost:3003/ip/', {
                    method:'get',
                    headers: {'Content-Type': 'application/json'},
    })
    .then (response=> response.json())
    .then (response=> {
            let lat=response.geobyteslatitude;
            let lon=response.geobyteslongitude;
            console.log(lat, lon)
            fetch('http://localhost:3003/air/' + lat + '/' + lon, {
              method:'get',
              headers: {'Content-Type': 'application/json'},
})
.then (response=> response.json())
.then (response=> {
     setAir(response.data.indexes.baqi.category)
     
     fetch('http://localhost:3003/weather/' + lat + '/' + lon, {
              method:'get',
              headers: {'Content-Type': 'application/json'},
})
.then (response=> response.json())
.then (response=> {
  console.log(response.data)
     setWeater(response.data)
    
        })
        })
              })

  }, []);
  
    return(
    <Popup
    trigger={
        <div className="pt-6 w-full md:w-4/12 px-4 text-center" data-aos="fade-left" data-aos-delay="1600">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg container-sector container-pop">
          <div className="px-4 py-5 flex-auto image-pop">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
            <i className="fas fa-list"></i>
            </div>
            <h6 className="text-xl font-semibold">
            Today Air Quality and Weather
            </h6>
            <p className="mt-2 mb-4 text-gray-600">
            Air pollution can cause both short term and long term effects on health and many people are concerned about pollution in the air that they breathe.
            </p>
          </div>
          <div className='overlay-green'>
          <div className='text'>Check how shopping list would looks like</div>
          </div>
        </div>
      </div>
    }
    modal
    closeOnDocumentClick
    >
    <div className='container-shopping'>
    <h1 className='shopping'>Today Air Quality and Weather</h1>
    <h2 className="air">Air Quality: {air}</h2>
    <h2 className="air">Weather: 
    {weather.weather_text}
   <br/>
   </h2>

    </div>
  </Popup>
       

    )
}

export default Pops