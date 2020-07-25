import React from "react";
import Col from 'react-bootstrap/Col';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './footer.css'

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gray-300 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
          style={{ height: "80px", transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div>
        <Accordion defaultActiveKey="0">
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1" className="resources text-sm text-gray-600 font-semibold py-1" >
    I use this components, <br/> please click here to check:
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
      <p className="link-resources">https://unsplash.com<br/></p>
      <p className="link-resources">https://giphy.com<br/></p>
      <p className="link-resources">https://www.heropatterns.com/<br/></p>
      <p className="link-resources">https://spoonacular.com/food-api<br/></p>
      <p className="link-resources">https://waqi.info/<br/></p>
      <p className="link-resources">https://geobytes.com/<br/></p>
      <p className="link-resources">https://react-bootstrap.github.io/<br/></p>
      <p className="link-resources">https://www.highcharts.com/<br/></p>
      <p className="link-resources">https://icon-library.com/<br/></p>
      <p className="link-resources">https://fontawesome.com/<br/></p>
      <p className="link-resources">https://www.nhs.uk/<br/></p>
      <p className="link-resources">https://michalsnik.github.io/aos/<br/></p>
      <p className="link-resources">https://www.emailjs.com/<br/></p>
      </Card.Body>
    </Accordion.Collapse>
  </Card>

</Accordion>
        
      
        
        </div>
        
          <hr className="my-6 border-gray-400" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-600 font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}Tailwind Starter Kit by{" "}
                <a
                  href="https://www.creative-tim.com"
                  className="text-gray-600 hover:text-gray-900"
                >
                <br/>
                  Creative Tim
                </a>.
              </div>
            </div>
          </div>
       
      </footer>
    </>
  );
}
