import React, {useState, useEffect} from "react";
// import { useHistory} from 'react-router-dom';
// import { Link } from 'react-router-dom';


export default function GoogleLanding() {
    const [code, setCode] = useState('')

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setCode(urlParams.get('code'))

        fetch('/api/google/verify', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: code
            })
        })
        .then (response => response.json())
        .then(user => {                                
            if (user.id) {
                // setCurrentUser(user)
                // history.push('/')
           } else {
            alert('you need register')
           }
        })
    }, [])

  return (
    <>
    {code}
    </>
  );
}
