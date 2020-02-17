import React, { Component } from 'react'
import { UserSession, Person } from 'blockstack'
import UserService from "../services/UserService";
import ArticleService from "../services/ArticleService";
import PaymentService from "../services/PaymentService";
import {jsonCopy, remove, check} from '../assets/utils'
import { appConfig, USER_INFO_FILE } from '../assets/constants'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../styles/Profile.css'
import '../styles/NavBar.css'
import {withGlobalContext} from "../contexts/GlobalContext";
import {parse} from "ethers/utils/transaction";

class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      tasks: [],
      value: '',
      tokenBalance: 0,
      bettingHistory: [],
      show: false
    };

    this.reloadInfo = this.reloadInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkTask = this.checkTask.bind(this);
    this.placeBet = this.placeBet.bind(this);
  }

  componentWillMount() {
    this.reloadInfo();
  }

  async reloadInfo() {
    const userInfo = await UserService.getInfo(this.props.userSession);
    const { numTokens, bettingHistory } = userInfo;
    console.log("LOADING");
    console.log(this.state);
    this.setState({tokenBalance: numTokens ? numTokens : 0, bettingHistory });
    console.log("LOADED");
    console.log(this.state);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
   }

  checkTask(e) {
    const tasks = check(e.target.dataset.index, this.state);
    this.setState({ tasks });
    this.saveTasks(tasks);
  }

  async placeBet() {
    let randomArticle = {}
    if (this.state.tokenBalance <= 0) return alert("Please buy more tokens");
    try {
      randomArticle = await ArticleService.getRandomArticle(this.props.userSession);
      console.log("RANDOM ARTICLE")
      console.log(randomArticle);
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
    const { userSession } = this.props;
    const profile = userSession.loadUserData();
    const { username } = profile;
    const person = new Person(profile);
    return (
      <div style={{ height: '100vh', backgroundColor: '#36B069' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '50px',
          marginRight: '50px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '75px',
            height: '150px',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
            <p style={{
              fontFamily: 'Roboto',
              color: '#fff',
              fontSize: '83px'
            }}>{this.state.tokenBalance}</p>
            <p style={{ fontFamily: 'Roboto', color: '#fff', marginLeft: '20px' }}>YOUR TOKEN BALANCE</p>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '50px',
            height: '200px',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <Link className="btn-white" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              outline: 'none',
              marginTop: '40px',
              textDecoration: 'none'
            }} onClick={() => this.setState({ show: true })} to={{
              pathname: '/'
            }} >Buy Tokens</Link>
            <div style={{ height: '20px' }} />
            <p style={{ color: '#fff', fontFamily: 'Roboto' }}>10 TOKENS = 0.028 ETH</p>
          </div>
          <div style={{ marginLeft: '50px' }} />
          <button className="btn-white" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              outline: 'none',
              marginBottom: '55px',
              textDecoration: 'none',
          }} onClick={() => this.placeBet()}>Place a Bet</button>
        </div>
        <Modal show={this.state.show} onHide={() => {
              this.setState({ show: false })
          }}>
              <Modal.Header closeButton>
                  <Modal.Title>How many tokens do you want to buy?</Modal.Title>
                  </Modal.Header>
                    <div style={{
                      margin: '20px 100px 20px 100px',
                    }}>
                      <Form.Control ref={i => this.inputNode = i} type="text" placeholder="Enter number of tokens you want to buy" required />
                    </div>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={() => {
                      this.setState({ show: false });
                      this.inputNode = null
                  }}>
                      Close
                  </Button>
                  <Button variant="success" onClick={async (e) => {
                    if (this.inputNode.value && Number.isInteger(parseInt(this.inputNode.value))) {
                      this.setState({ show: false, articleIsTrue: true });
                      const val = this.inputNode.value
                      console.log(this.inputNode.value);
                      console.log(userSession);
                      await UserService.addTokens(userSession, parseInt(val));
                      this.reloadInfo();
                      await PaymentService.receivePayment(PaymentService.calculateFee(val));
                    }
                  }}>
                      Save Changes
                  </Button>
              </Modal.Footer>
          </Modal>
      </div>
  );
  }

}

// Made this a default prop (instead of using this.userSession) so a dummy userSession
// can be passed in for testing purposes
Profile.defaultProps = {
  userSession: new UserSession(appConfig)
};

export default withGlobalContext(Profile);
