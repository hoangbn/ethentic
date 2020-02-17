import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'
import { Person } from 'blockstack';

class NavBar extends Component {
    render() {
        const profile = this.props.userSession.loadUserData();
        const username = profile.username;
        const user = new Person(profile);
        return (
          <nav className="navbar navbar-white">
            <Link className="navbar-brand navbar-child" to="/">ETHentic</Link>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link navbar-child" to='/' style={{
                  marginLeft: '50px'
                }}>{username}</Link>
              </li>
            </ul>
            <img src={user.avatarUrl() ? user.avatarUrl() : './avatar-placeholder.png'} class="avatar" width="25" height="25"alt=""/>
            <div className="navbar-child"
              style={{
                marginTop: '10px',
                marginRight: '20px',
              }}
              onClick={this.props.signOut.bind(this)}
            ><p>Sign out</p>
            </div>
          </nav>
        )
    }
}

export default NavBar