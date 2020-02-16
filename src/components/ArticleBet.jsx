import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar'

export default class ArticleBet extends Component {
    render() {
        let articleTitle = 'Title of Article'
        let articleContent =  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `

        const { username, user, signOut, tokenBalance } = this.props.location;

        return (
            <div style={{ height: '100vh', backgroundColor: '#36B069' }}>
                {/* <NavBar username={username} user={user} signOut={signOut}/> */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginLeft: '50px'
                }}>
                    <p style={{
                        fontFamily: 'Roboto',
                        color: '#fff',
                        fontWeight: 20,
                        marginRight: '10px'
                    }}>BALANCE</p>
                    <span style={{
                        fontFamily: 'Roboto',
                        color: '#fff'
                    }}>{tokenBalance} TOKENS</span>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <p style={{
                        fontFamily: 'Roboto',
                        color: '#fff',
                        fontSize: '40px',
                        textAlign: 'center'
                    }}>Is this information trustworthy?</p>
                    <textarea disabled rows="15" style={{
                        resize: 'none',
                        outline: 'none',
                        border: 'none',
                        borderRadius: '10px',
                        width: '75vw',
                        marginLeft: '12.5vw',
                        textAlign: 'justify',
                        padding: '20px 50px 20px 50px',
                        whiteSpace: 'pre-wrap',
                    }}>
                        {`${articleTitle.toUpperCase()}\n\n${articleContent}`}
                    </textarea>
                </div>
            </div>
        );
    }
}