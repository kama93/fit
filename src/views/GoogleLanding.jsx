import React, {useState} from "react";
import { useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Login() {
  const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const history=useHistory();

    const onEmailChange=(event)=> {
        setSignInEmail(event.target.value)
    }
    
    const onPasswordChange=(event)=> {
        setSignInPassword(event.target.value)
    }

    const onSubmitSignIn=()=>{
        fetch('http://localhost:3003/signin', {
            method:'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                // setCurrentUser(user);
                history.push('/')
            }
            else {
                alert('Wrong password or email')
            }
        })
    }


  return (
    <>
    </>
  );
}
