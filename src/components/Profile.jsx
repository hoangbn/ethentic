import React, { Component } from 'react'
import { UserSession, Person } from 'blockstack'
import NavBar from './NavBar'
import {jsonCopy, remove, check} from '../assets/utils'
import PaymentService from '../services/PaymentService';
import { appConfig, USER_INFO_FILE } from '../assets/constants'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../styles/Profile.css'
import '../styles/NavBar.css'

class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      tasks: [],
      value: '',
      tokenBalance: 100000.00,
      show: false
    };

    this.loadTasks = this.loadTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
  }

  componentWillMount() {
    this.loadTasks();
  }

  componentWillReceiveProps(nextProps) {
    const nextTasks = nextProps.tasks;
    if(nextTasks) {
      if (nextTasks.length !== this.state.tasks.length) {
        this.setState({ tasks: jsonCopy(nextTasks) });
      }
    }
  }

  loadTasks() {
    const options = { decrypt: true };
    this.props.userSession.getFile(USER_INFO_FILE, options)
    .then((content) => {
      console.log(content);
      if(content) {
        const tasks = JSON.parse(content);
        this.setState({tasks});
      } 
    })
  }

  saveTasks(tasks) {
    const options = { encrypt: true };
    this.props.userSession.putFile(USER_INFO_FILE, JSON.stringify(tasks), options);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
   }

  removeTask(e) {
    e.preventDefault();
    //fixed: undefined data-index from input
    const tasks = remove(e.currentTarget.dataset.index, this.state);
    this.setState({ tasks });
    this.saveTasks(tasks);
  }

  addTask(e) {
    e.preventDefault();
    PaymentService.receivePayment();
  }

  checkTask(e) {
    const tasks = check(e.target.dataset.index, this.state);
    this.setState({ tasks });
    this.saveTasks(tasks);
  }

  render() {
    const username = this.props.userSession.loadUserData().username;
    const profile = this.props.userSession.loadUserData();
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
            alignItems: 'flex-start',
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
            <p style={{ color: '#fff', fontFamily: 'Roboto' }}>0.035 ETH = 35 TOKENS</p>
          </div>
          <div style={{ marginLeft: '50px' }} />
          <Link className="btn-white" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              outline: 'none',
              marginBottom: '55px',
              textDecoration: 'none',
          }} to={{
            pathname: '/article-bet',
            username: username,
            user: person,
            signOut: this.props.handleSignOut,
            tokenBalance: this.state.tokenBalance
          }}>Place a Bet</Link>
        </div>
        <Modal show={this.state.show} onHide={() => {
              console.log('hidden')
              this.setState({ show: false })
          }}>
              <Modal.Header closeButton>
                  <Modal.Title>How many tokens do you want to buy?</Modal.Title>
                  </Modal.Header>
                    <div style={{
                      margin: '20px 100px 20px 100px',
                    }}>
                      <Form.Control ref={i => this.inputNode = i} type="text" placeholder="20" />
                    </div>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={() => {
                      this.setState({ show: false })
                      this.inputNode = null
                  }}>
                      Close
                  </Button>
                  <Button variant="success" onClick={(e) => {
                    if (this.inputNode.value || Number.isInteger(this.inputNode.value)) {
                      this.setState({ show: false, articleIsTrue: true })
                      console.log(this.inputNode.value)
                    }
                    // buy ether
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

export default Profile
