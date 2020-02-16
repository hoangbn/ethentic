import React, { Component } from 'react';
import '../styles/Signin.css'

class Signin extends Component {

  render() {
    const { handleSignIn } = this.props;

    return (
      <div>
        <nav class="navbar-emerald navbar-static-top">
          <a class="navbar-brand" href="https://blockstack.org"><img src="white-logo.svg" alt="" /></a>
        </nav>
        <div className ="intro">
          <div className="panel-landing" id="section-1">
            <h1 className="landing-heading">BetStack</h1>
            <p>A decentralized To-do app built on <a href="https://blockstack.org" target="_blank"rel="noopener noreferrer">Blockstack</a></p>
            <button
              className="btn-emerald"
              id="signin-button"
              onClick={ handleSignIn.bind(this) }
              style={{
                outline: 'none'
              }}
            >
              Sign In with Blockstack
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin
