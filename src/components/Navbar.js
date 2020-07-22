import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/actions';

import AOS from 'aos'
import './nav.css'

AOS.init({
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false,
});

function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  
  
  return (
    <>
      <nav
        className={
          (props.transparent
            ? "absolute z-50 w-full"
            : "relative shadow-lg  shadow-lg") +
          " flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">

          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start" data-aos="fade-right">
          <Link to='./'>
            <img src="food.png" alt='food logo' className='logo' />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              data-aos="fade-left"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-white" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center  lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">

            </ul>
            {props.currentUser?
              (<ul className="flex flex-col lg:flex-row list-none lg:ml-auto" data-aos="fade-left">
                <li className="flex items-center">
                  <Link
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    to= './diet'
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    Weekly diet
                </Link>
                </li>
                <li className="flex items-center">
                  <a
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/landing"
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    Progress tracking
            </a>
                </li>
                <li className="flex items-center">

                  <Link
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    to='./fridge'
                   
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    <p>Fridge check</p>
                  </Link>
                </li>
                
                <li className="flex items-center">

                  <Link
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    to='./login'
                    onClick={()=>props.setCurrentUser(null)}
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    <p>Sign Out</p>
                  </Link>
                </li>
              </ul>) :
              (<ul>
                <li className="flex items-center">

                  <Link
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    to='./login'
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    <p>Sign In</p>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    to='./register'
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    <p>Registration</p>
                  </Link>
                </li>
              </ul>)}
          </div>
        </div>
      </nav>                                       
    </>
      );
    }
    
const mapStateToProps = state => ({
        currentUser: state.user.currentUser
    });
const mapDispatchToProps= dispatch=>({
        setCurrentUser: user => dispatch(setCurrentUser(user))
    })
    
    
    export default connect(mapStateToProps, mapDispatchToProps)(Navbar);