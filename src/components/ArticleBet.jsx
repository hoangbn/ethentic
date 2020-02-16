import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar'

export default class ArticleBet extends Component {
    render() {
        let articleTitle = 'Title of Article'
        let articleContent =  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `

        const { username, user, signOut, tokenBalance } = this.props.location;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#36B069' }}>
                <NavBar username={username} user={user} signOut={signOut}/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '5px',
                    marginLeft: '50px',
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
                    marginTop: '15px'
                }}>
                    <p style={{
                        fontFamily: 'Roboto',
                        color: '#fff',
                        fontSize: '40px',
                        textAlign: 'center',
                    }}>Is this information trustworthy?</p>
                    <textarea disabled rows="15" style={{
                        resize: 'none',
                        outline: 'none',
                        border: 'none',
                        borderRadius: '10px',
                        width: '75vw',
                        marginLeft: '12.5vw',
                        textAlign: 'justify',
                        padding: '30px 50px 30px 50px',
                        whiteSpace: 'pre-wrap',
                        marginTop: '5px',
                        fontFamily: 'Roboto',
                        fontSize: '16px'
                    }}>
                        {`${articleTitle.toUpperCase()}\n\n${articleContent}`}
                    </textarea>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '40px',
                    }}>
                        <Link className="btn-white" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outline: 'none',
                            marginBottom: '55px',
                            textDecoration: 'none',
                            marginRight: '35px'
                        }} to="/">Yes</Link>
                        <Link className="btn-white" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outline: 'none',
                            marginBottom: '55px',
                            textDecoration: 'none',
                            marginLeft: '35px'
                        }} to="/">No</Link>
                    </div>
                </div>
            </div>
        );
    }
}