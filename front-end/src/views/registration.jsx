import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setCurrentUser } from '../redux/actions';
import { setUserCpm } from '../redux/actions-cpm';
import { connect } from 'react-redux';

function Register({ setCurrentUser, setUserCpm }) {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const history = useHistory();

  const onEmailChange = (event) => {
    setSignUpEmail(event.target.value)
  }
  const onConfirmChange = (event) => {
    setConfirm(event.target.value)

  }
  const onPasswordChange = (event) => {
    setSignUpPassword(event.target.value)
  }

  //   const  onChangeCheckbox = event => {
  //    setIsChecked(event.target.value)
  //    loginSubmit()
  // }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmitSignUp()
    }
}

  const onSubmitSignUp = () => {
    // sending registration info to database
    if (signUpPassword === confirm) {
      fetch('/api/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signUpEmail,
          password: signUpPassword,
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            setCurrentUser(user);
            setUserCpm(null);
            history.push('/')
          } else {
            alert('you need register')
          }
        })
    }
    else {
      alert('All fields must be completed.')
    }
  }

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url(orange.jpg)",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <Link to='./login'><small>Or sign in</small></Link>
                    </div>
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Email"
                          required
                          style={{ transition: "all .15s ease" }}
                          onChange={onEmailChange}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Password"
                          required
                          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" 
                          title="Please include at least 1 uppercase character, 1 lowercase character and 1 number"
                          style={{ transition: "all .15s ease" }}
                          onChange={onPasswordChange} />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm password
                        </label>
                        <input
                          type="password"
                          required
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                          placeholder="Confirm Password"
                          style={{ transition: "all .15s ease" }}
                          onChange={onConfirmChange}
                          onKeyDown={e => handleKeyDown(e)}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={onSubmitSignUp}
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setUserCpm: cpm => dispatch(setUserCpm(cpm))
  }
}

export default connect(null, mapDispatchToProps)(Register);