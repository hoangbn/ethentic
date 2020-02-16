import React, { Component } from 'react';
import './styles/App.css'
import Profile from './components/Profile'
import {Route, Switch, withRouter} from "react-router-dom";
import ArticleBet from './components/ArticleBet';
import BetReceived from "./components/BetReceived";
import Signin from './components/Signin';
import { UserSession } from 'blockstack';
import { appConfig } from './assets/constants'
import NavBar from "./components/NavBar";
import { withGlobalContextProvider, withGlobalContext } from "./contexts/GlobalContext";
import { setUserSession } from "./contexts/actions/user";
require('typeface-roboto');

const userSession = new UserSession({ appConfig });

class App extends Component {
  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { !userSession.isUserSignedIn() ?
              <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
              : (
                  <div>
                    <NavBar userSession={userSession} signOut={this.handleSignOut}/>
                    <Switch>
                        <Route exact path="/" component={Profile} />
                        <Route exact path="/article-bet" component={ArticleBet} />
                        <Route exact path="/bet-received" component={BetReceived} />
                    </Switch>
                  </div>
              )
          }
        </div>
      </div>
    );
  }

  componentWillMount() {
    const { globalContext } = this.props;

    globalContext.dispatch(setUserSession, { userSession });
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }
}

export default withGlobalContextProvider(withGlobalContext(withRouter(App)));
