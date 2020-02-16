import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar'
import correct from '../assets/correct.png';
import incorrect from '../assets/incorrect.png';
import ArticleService from "../services/ArticleService";
import { withGlobalContext } from "../contexts/GlobalContext";

class BetReceived extends Component {
    async placeBet() {
        let randomArticle = {}
        if (this.props.location.tokenBalance <= 0) return alert("Please buy more tokens");
        try {
            const { userSession } = this.props.globalContext.state;
            randomArticle = await ArticleService.getRandomArticle(userSession);
          // randomArticleTemp = {
          //   userReviewCount: 0,
          //   userTrueCount: 0,
          //   closed: false,
          //   _id: `5e49531e390ad21e02da5fda`,
          //   title: 213123213213,
          //   content: `Epstein alive while in the Metropolitan Correctional Center in Manhattan. He also is friends with Bill and Hillary Clinton.`,
          //   isTrue: false,
          //   __v: 0
          // }
          // console.log(randomArticleTemp)
          console.log(randomArticle);
        } catch (err) {
          console.log(err);
        }
        this.props.history.push({
          pathname: '/article-bet',
          state: { 
            tokenBalance: this.state.tokenBalance,
            randomArticle
          },
        })
    }

    render() {
        const {
            username,
            user,
            signOut,
            tokenBalance,
            articleIsTrue,
            articleIsTrueML,
            articleTitle,
            articleSource
        } = this.props.location;

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
                <img src={articleIsTrue === articleIsTrueML ? correct : incorrect} style={{
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
                }}>{articleIsTrue === articleIsTrueML ? 'Good judgement!' : 'Maybe next time 😢'}</p>
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
                        }}>{articleSource}</i>
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
                    }} onClick={() => this.placeBet()}>Bet Again</Link>
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

export default withGlobalContext(BetReceived);
