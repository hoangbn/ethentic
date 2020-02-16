import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBar from './NavBar'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class ArticleBet extends Component {
    state = {
        show: false,
        articleIsTrue: true,
        tokenFee: 5
    }

    render() {
        let articleTitle = `CDC Recommends Also Wearing Face Mask On Back Of Head In Case Coronavirus Attacks From Rear`
        let articleContent =  `ATLANTA — As documented cases of the disease increased and more Americans wanted to take proactive measures to avoid infection, the Centers for Disease Control and Prevention reportedly recommended Thursday also wearing a face mask on the back of one’s head in case the coronavirus attacks from the rear. “Given the ruthless efficiency at which the coronavirus can spread, we’re advising all Americans that wearing a face mask over your mouth is insufficient to fully protect yourself from any particularly wily strains of the virus sneaking up behind you and catching you unaware,” said CDC principal deputy director Anne Schuchat, explaining that the coronavirus was a notoriously sneaky disease and put anyone who didn’t adequately safeguard their back and the sides of their body at imminent risk. “Look, this is a disease that plays dirty, and in that respect, it’s much worse than SARS. You’ll need to have all your wits about you if you intend to stay one step ahead of its wicked grasp. You never know when it could creep silently behind you and infect you from the rear, which is why the CDC recommends that in addition to wearing a face mask on the back of your head, you always sit facing the entrance of any room you’re in with your back to the wall. We also strongly caution all Americans to look at any mirror they pass by in case the coronavirus is trying to trail them, and also to wear another face mask on top of your head to shield against aerial attacks.” CDC officials also recommended singing loudly, wearing strings of bells around your neck, or frequently blowing an air horn in an effort to scare off any coronavirus that might be lingering nearby. `

        const { username, user, signOut, tokenBalance } = this.props.location;
        const { show, articleIsTrue, tokenFee } = this.state

        console.log(this.state.articleIsTrue);

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#36B069'
            }}>
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
                        {`${articleTitle.toUpperCase()}\n\n${articleContent}`}
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
                        }} onClick={() => this.setState({ show: true, articleIsTrue: true })}>Yes</button>
                        <button className="btn-white" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            outline: 'none',
                            marginBottom: '55px',
                            textDecoration: 'none',
                            marginLeft: '35px'
                        }} onClick={() => this.setState({ show: true, articleIsTrue: false })}>No</button>
                    </div>
                </div>
                <Modal show={show} onHide={() => {
                    console.log('hidden')
                    this.setState({ show: false })
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{articleTitle}</Modal.Title>
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
                            username: username,
                            user: user,
                            signOut: signOut,
                            tokenBalance: tokenBalance - tokenFee,
                            articleIsTrue
                        }}>
                            <Button variant="success" onClick={() => {
                                this.setState({ show: false, articleIsTrue: true })
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