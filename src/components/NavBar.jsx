import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

class NavBar extends Component {

  render() {
    const username = this.props.username;
    const user = this.props.user;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-blue fixed-top">
        <Link className="navbar-brand" to="/">Bet Stack</Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to='/'>{username}</Link>
          </li>
        </ul>
        <img src={user.avatarUrl() ? user.avatarUrl() : './avatar-placeholder.png'} class="avatar" width="25" height="25"alt=""/>
        <button
          className="btn btn-primary"
          onClick={this.props.signOut.bind(this)}
        >Sign out
        </button>

      </nav>
    )
  }
}

export default NavBar