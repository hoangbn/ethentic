import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar'
import correct from '../assets/correct.png';
import incorrect from '../assets/incorrect.png';

export default class BetReceived extends Component {
    render() {
        let articleTitle = `CDC Recommends Also Wearing Face Mask On Back Of Head In Case Coronavirus Attacks From Rear`
        let source = 'The Onion'
        let articleIsTrueML = false

        const { username, user, signOut, tokenBalance, articleIsTrue } = this.props.location
        console.log(`ArticleIsTrue: ${articleIsTrue}`)

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
                <img src={articleIsTrueML === articleIsTrue ? correct : incorrect} style={{
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
                }}>{articleIsTrueML === articleIsTrue ? 'Good judgement!' : 'Maybe next time 😢'}</p>
                <div>
                    <p style={{
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        color: '#fff',
                        marginTop: '35px'
                    }}>Here is some more information about the article you just read:</p>
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
                <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Link className="btn-white" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        outline: 'none',
                        marginTop: '40px',
                        marginBottom: '55px',
                        marginRight: '25px',
                        textDecoration: 'none',
                    }} to={{
                        pathname: '/',
                        username: username,
                        user: user,
                        signOut: signOut,
                    }}>Back to Dashboard</Link>
                    <Link className="btn-white" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        outline: 'none',
                        marginTop: '40px',
                        marginBottom: '55px',
                        marginLeft: '25px',
                        marginRight: '25px',
                        textDecoration: 'none',
                    }} to={{
                        pathname: '/article-bet',
                        username: username,
                        user: user,
                        signOut: signOut,
                        tokenBalance: tokenBalance
                    }}>Bet Again</Link>
                    <Link className="btn-white" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        outline: 'none',
                        marginTop: '40px',
                        marginBottom: '55px',
                        marginLeft: '25px',
                        textDecoration: 'none'
                    }} to={{
                        pathname: '/heyheyy',
                        username: username,
                        user: user,
                        signOut: signOut,
                        tokenBalance: tokenBalance
                    }}>FREE ETHER (LIMITED)</Link>
                </div>
            </div>
        );
    }
}