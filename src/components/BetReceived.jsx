import React, { Component } from 'react';
import betReceivedImg from '../assets/bet-received.png';

export default class BetReceived extends Component {
    render() {
        let articleTitle = `CDC Recommends Also Wearing Face Mask On Back Of Head In Case Coronavirus Attacks From Rear`
        let source = 'The Onion'

        const { username, user, signOut } = this.props.location;

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column', 
                justifyContent: 'flex-start',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#36B069'
            }}>
                {/* <NavBar username={username} user={user} signOut={signOut}/> */}
                <img src={betReceivedImg} style={{
                    marginTop: '75px',
                    height: '100px',
                    width: '100px',
                }} />
                <p style={{
                    fontFamily: 'Roboto',
                    fontSize: '30px',
                    color: '#fff',
                    marginTop: '10px',
                    fontWeight: 'bold'
                }}>Bet received!</p>
                <p style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    color: '#fff',
                }}>Outcomes will appear in 2-5 hours.</p>
                <div>
                    <p style={{
                        fontFamily: 'Roboto',
                        fontSize: '14px',
                        color: '#fff',
                        marginTop: '35px'
                    }}>Here's some more information about the article you just read:</p>
                    <div style={{
                        width: '60vw',
                        backgroundColor: '#fff',
                        padding: '25px 50px 25px 50px',
                        borderRadius: '10px'
                    }}>
                        <p style={{
                            margin: 0,
                            marginBottom: '10px',
                            fontFamily: 'Roboto',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: '#707571',
                        }}>{articleTitle}</p>
                        <i style={{
                            margin: 0,
                            fontFamily: 'Roboto',
                            fontSize: '14px',
                            color: '#707571',
                        }}>{source}</i>
                    </div>
                </div>
            </div>
        );
    }
}