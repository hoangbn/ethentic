import React, { Component } from 'react'
import { UserSession, Person } from 'blockstack'
import NavBar from './NavBar'
import {jsonCopy, remove, add, check} from '../assets/utils'
import { appConfig, USER_INFO_FILE } from '../assets/constants'
import '../styles/Profile.css'
import '../styles/NavBar.css'
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      tasks: [],
      value: '',
      tokenBalance: 100000.00
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
    const tasks = add(this.state);
    this.setState({value: '', tasks});
    this.saveTasks(tasks);
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
        <NavBar username={username} user={person} signOut={this.props.handleSignOut}/>
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
            marginRight: '50px',
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
            }} to={{
              pathname: '/'
            }}>BUY TOKENS</Link>
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
          }}>PLACE A BET</Link>
        </div>
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
