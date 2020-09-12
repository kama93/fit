import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";

import './pop2.css'

function Pops() {
  let [air, setAir] = useState('');
  let [lat, setLat] = useState('');
  let [lng, setLng] = useState('');
  let [level, setLevel] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('bla')
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  }, [])
  
  useEffect(() => {
      console.log(lat, lng)
    // getting info about air pollution update
    fetch('/api/air/' + lat + "/" + lng, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(response => {
        setAir(response);
        // adding comment to aqi level
        if (!response.data) {
          setLevel('Unknown')
        } else if (response.data.aqi < 50) {
          setLevel('Good')
        }
        else if (response.data.aqi < 100 && response.data.aqi > 51) {
          setLevel('Moderate')
        }
        else if (response.data.aqi < 150 && response.data.aqi > 101) {
          setLevel('Unhealthy for Sensitive Groups')
        }
        else if (response.data.aqi < 200 && response.data.aqi > 151) {
          setLevel('Unhealthy')
        }
        else if (response.data.aqi < 300 && response.data.aqi > 201) {
          setLevel('Very Unhealthy')
        }
        else {
          setLevel('Hazardous')
        }
      })
  }, [lat, lng]);

  return (
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
      {air ?
        (<div className="container-yellow-container">
          <div className='container-air-pollution'>
            <h3 className="air-city">{air.data && air.data.city && air.data.city.name}</h3>
            <h1 className="air-aqi">{air.data && air.data.aqi}</h1>
            <h2 className="air-level">{level}</h2>
          </div></div>) : (
            <div className="container-yellow-container">
            <div className='container-air-pollution'>
            <h3 className="air-city">No data available, check leater.</h3>
          </div></div>)}
    </Popup>
  )
}

export default Pops