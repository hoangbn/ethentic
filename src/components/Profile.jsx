import React, { Component } from 'react'
import { UserSession, Person } from 'blockstack'
import NavBar from './NavBar'
import {jsonCopy, remove, add, check} from '../assets/utils'
import { appConfig, USER_INFO_FILE } from '../assets/constants'
import '../styles/Profile.css'

class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      tasks: [],
      value: '',
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
      <div className="Dashboard">
      <NavBar username={username} user={person} signOut={this.props.handleSignOut}/>
        <div className="row justify-content-center"id="header">
          <h3 className="user-info">
            {username}'s to-dos
          </h3>
        </div>
        <br/>
        <div className="row justify-content-center">
          <div
            id="addTask"
            className="frame"
            style={{borderColor: '#f8f9fa'}}
          >
            <form onSubmit={this.addTask} className="input-group">
              <input
                className="form-control"
                type="text"
                onChange={this.handleChange}
                value={this.state.value}
                required
                placeholder="To-do..."
                autoFocus={true}
              />
              <div className="input-group-append" id="add-task">
                <input type="submit" className="btn btn-primary" value="Add"/>
              </div>
            </form>
            </div>
          </div>
        <br></br>
        <div className="row justify-content-center">
          <div className="frame">
            {this.state.tasks.map((task, i) =>
              <ul key={i}>
                <div className="row">
                  <input type="checkbox" className="form-check-input" data-index={i} onClick={this.checkTask} checked={task[1]? true : false}></input>
                  <div className="col">
                    <span className="input-group-text">
                      <div className="task">
                        {task[1]? <s>{task[0]}</s> : task[0]}
                      </div> 
                      <div className="delete">
                        <button className="btn btn-primary" data-index={i} onClick={this.removeTask}>
                          <div className="X" data-index={i}>X</div>
                        </button>
                      </div>
                    </span>
                    </div>
                  </div>
              </ul>
            )}
          </div>
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
