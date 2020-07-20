import React from 'react';
import Popup from "reactjs-popup";

import './pop2.css'



function Pops (){
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
              Shopping list
            </h6>
            <p className="mt-2 mb-4 text-gray-600">
              Check here to create yours shopping list or to get ready one prepared bsed on your weekly plan.
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
    <h1 className='shopping'>Shopping List to download</h1>
    </div>
  </Popup>
       

    )
}

export default Pops