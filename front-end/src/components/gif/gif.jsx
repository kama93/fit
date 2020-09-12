import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { fetchWithToken } from '../../api'

import './gif.css'

const Gif = ({ currentUser }) => {
    let [number, setNumber] = useState(0)

    useEffect(() => {
        if (currentUser)
        // getting info from database about number of added bottles (info renew every day- done in server side)
        {
            fetchWithToken('/api/bottle/' + currentUser.email, currentUser.fitToken, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(response => {
                setNumber(response.numbot);
            })
        }
    }, [currentUser]);

    const addWater = () => {
        setNumber(Math.min(number + 1, 4));
        if (currentUser)
        // adding number of drunk water bottles
        {
            fetchWithToken('/api/bottle', currentUser.fitToken, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: currentUser.email,
                    numBot: number + 1
                })
            })
            .then(response => response.json())
            .then(response => console.log(response))
        }
    }

    return (
        <div>
            {currentUser ?
                (<Popup
                    trigger={
                        <div className="gif-container" >
                            <img data-aos="fade-left" alt="bottle" data-aos-delay="1000" src="https://media.giphy.com/media/Wq4XUa87MWQyLT5CET/giphy.gif" frameBorder="0" className="gif" ></img>
                        </div>}
                    modal
                    closeOnDocumentClick>
                    <div className="container-gif-bottle">
                        <div>Remember, you should drink at least 2L of water a day.</div>
                        <div className="bottle-container">

                            {Array(number).fill().map(x => (<img className="bottle" alt="bottle" src="bottle.png" />))}
                        </div><br />
                        {number === 4 && (<div>Congrats! You have reached your goal.</div>)}
                        {number !== 4 && <div className="container-button-new-plan">
                            <Button variant="primary" type="submit" className="button button-weekly-diet" onClick={() => addWater()}>Add 250 mls
                        </Button></div>
                        }
                    </div>
                </Popup>) : (<div></div>)}
        </div>
    )
};
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Gif);