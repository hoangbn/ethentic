import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { withGlobalContext } from "../contexts/GlobalContext";
import UserService from "../services/UserService";

class ArticleBet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            tokenBalance: 0
        }
    }
    

    componentWillMount() {
        this.reloadInfo();
    }

    async reloadInfo() {
        const userInfo = await UserService.getInfo(this.props.globalContext.state.userSession);
        const { numTokens } = userInfo;
        this.setState({tokenBalance: numTokens ? numTokens : 0 });
      }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    render() {
        console.log(this.props);

        const { _id, title, content, isTrue, source } = this.props.location.state.randomArticle;
        console.log(title)
        console.log(content)
        console.log(isTrue)

        console.log(this.articleTitles);
        const { userSession } = this.props.globalContext.state;
        const { username, user, randomArticle, tokenBalance } = this.props.location.state;
        const { show, articleIsTrue, tokenFee } = this.state;

        if (!randomArticle || Object.entries(randomArticle).length === 0) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: '#36B069'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '50px'
                    }}>
                        <p style={{
                            fontFamily: 'Roboto',
                            color: '#fff',
                            fontSize: '30px'
                        }}>You've completed all the questions, great job! 🎉🎉🎉</p>
                        <Link className="btn-white" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outline: 'none',
                            marginTop: '25px',
                            marginBottom: '55px',
                            marginRight: '25px',
                            textDecoration: 'none',
                        }} to={{
                            pathname: '/',
                            userSession: userSession
                        }} onClick={() => UserService.resetArticles(userSession)}>
                            Restart Demo
                        </Link>
                    </div>
                </div>
            )
        }


        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#36B069'
            }}>
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
                    <textarea disabled style={{
                        resize: 'none',
                        outline: 'none',
                        border: 'none',
                        borderRadius: '10px',
                        height: '50vh',
                        width: '75vw',
                        marginLeft: '12.5vw',
                        textAlign: 'justify',
                        padding: '30px 50px 30px 50px',
                        whiteSpace: 'pre-wrap',
                        marginTop: '5px',
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        lineHeight: 2,
                        color: '#707571',
                    }}>
                        {`${title}\n\n${content}`}
                    </textarea>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '40px',
                    }}>
                        <button className="btn-white" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outline: 'none',
                            marginBottom: '55px',
                            textDecoration: 'none',
                            marginRight: '35px'
                        }} onClick={() => {
                            this.setState({ show: true, articleIsTrue: true })
                        }}>Yes</button>
                        <button className="btn-white" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outline: 'none',
                            marginBottom: '55px',
                            textDecoration: 'none',
                            marginLeft: '35px'
                        }} onClick={async () => {
                            await UserService.test(userSession);
                            this.setState({ show: true, articleIsTrue: false });
                        }}>No</button>
                    </div>
                </div>
                <Modal show={show} onHide={() => {
                    this.setState({ show: false })
                }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>{articleIsTrue ? 'Yes, I trust this.' : `No, I don't trust this.`}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            this.setState({ show: false })
                        }}>
                            Close
                        </Button>
                        <Link to={{
                            pathname: '/bet-received',
                            // username: username,
                            // user: user,
                            articleIsTrue,
                            articleIsTrueML: isTrue,
                            articleTitle: title,
                            articleSource: source,
                            tokenBalance
                        }}>
                            <Button variant="success" onClick={async () => {
                                this.setState({ show: false, articleIsTrue: true });
                                await UserService.spendToken(userSession, _id);
                                await this.reloadInfo();
                            }}>
                                Save Changes
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withGlobalContext(ArticleBet);