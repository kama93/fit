import React, { useState } from 'react';
import * as emailjs from 'emailjs-com';

const Email = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const isFormValid = () => {
    return values.name && values.email && values.message
  };


  const sendEmail = (e) => {
    var template_params = {
      "reply_to": values.email,
      "from_name": values.name,
      "to_name": "admin",
      "message_html": values.message
    }

    // var service_id = "default_service";
    // var template_id = "template_LwFpgbFJ";
    emailjs.send("default_service", 'template_GAYTT55A', template_params, 'user_yS78SCiBWhWaX1xdnDEIn')
      .then((result) => {
        setValues({
          name: '',
          email: '',
          message: '',
        });
      }, (error) => {
        console.log(error.text + 'no funciona');
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      sendEmail(e);
    }
  };



  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
        <div className="w-full lg:w-6/12 px-4" >
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
            <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl font-semibold">
                Want to ask something?
                </h4>
              <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                Complete this form and we will get back to you in 24 hours.
                </p>
              <div className="relative w-full mb-3 mt-8">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                  </label>
                <input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="name"
                  style={{ transition: "all .15s ease" }}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                  </label>
                <input
                  type="email"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Email"
                  id="email"
                  name="email"
                  style={{ transition: "all .15s ease" }}
                  onChange={handleChange}
                  value={values.email}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                  </label>
                <textarea
                  onChange={handleChange}
                  rows="4"
                  cols="80"
                  name="message"
                  id="message"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Type a message..."
                  value={values.message}
                />
              </div>
              <div className="text-center mt-6">
                <button
                  className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Send Message
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

};

export default Email