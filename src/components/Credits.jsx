import React, { Component } from 'react'
import { Link } from "react-router-dom";
import easterEgg from '../assets/easterEgg.png'
import easterEggSound from '../assets/easterEgg.mp3';

const Sound = require('react-sound').default;

export default class Credits extends Component {
    render() {
        const { username, user, signOut, tokenBalance } = this.props.location

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#36B069',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p style={{
                    fontFamily: 'Roboto',
                    fontSize: '24px',
                    color: '#fff',
                    fontWeight: 'bold'
                }}>Babu Frik says, "Don't believe everything you see on the internet" 🤑</p>
                <img src={easterEgg} style={{
                    height: '500px',
                    width: '1000px',
                    marginTop: '30px'
                }} />
                <Link className="btn-white" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    outline: 'none',
                    marginTop: '75px',
                    marginLeft: '25px',
                    textDecoration: 'none',
                }} to={{
                    pathname: '/',
                    username: username,
                    user: user,
                    signOut: signOut,
                }}>Shamefully walk away</Link>
                <Sound
                    url={easterEggSound}
                    playStatus={Sound.status.PLAYING}
                />
            </div>
        );
    }
}