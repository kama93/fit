import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";
import { connect } from 'react-redux';
import { currentUser } from '../../redux/actions';
import Button from 'react-bootstrap/Button';

import './gif.css'

const Gif = ({currentUser}) => {
    let [number, setNumber] = useState(0)

    useEffect(() => {
        if (currentUser)
        {fetch('http://localhost:3003/bottle/' + currentUser.email, {
                        method:'get',
                        headers: {'Content-Type': 'application/json'}
        })
        .then (response=> response.json())
        .then(response => {
            setNumber(response.numbot); 
        })}
    }, [currentUser]);

    const addWater = () => {
        setNumber(Math.min(number + 1, 4));
        if (currentUser)
        {fetch('http://localhost:3003/bottle', {
            method:'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: currentUser.email,
                numBot:number+1
            })
        })
        .then(response => response.json())
        .then(response=>console.log(response))}
    }
    return (
        <div>
        {currentUser?
        (<Popup
            trigger={
                <div className="gif-container" >
                    <img data-aos="fade-left" data-aos-delay="1000" src="https://media.giphy.com/media/Wq4XUa87MWQyLT5CET/giphy.gif" width="250" height="250" frameBorder="0" className="gif" ></img>
                </div>}
            modal
            closeOnDocumentClick>
            <div className="container-gif-bottle">
                <div>Remember, you should drink at least 2L of water a day.</div>
                <div className="bottle-container">
                    
                     {Array(number).fill().map(x => (<img className="bottle" src="bottle.png" />))}
                </div><br />
                { number == 4 && (<div>Congrats! You have reached your goal.</div> )}
                { number != 4 && <div className="container-button-new-plan"><Button variant="primary" type="submit" className="button" className="button-weekly-diet" onClick={()=>addWater()}>Add 250 mls
                        
                        </Button></div>
                      }
            </div>
        </Popup>):(<div></div>)}
        </div>
    )
};
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect( mapStateToProps)(Gif);