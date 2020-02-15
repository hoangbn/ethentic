import React from 'react'
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import App from './App';
import ArticleBet from './components/ArticleBet';
import 'bootstrap/dist/css/bootstrap.css'

const main = () => {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/" component={withRouter(App)} />
                <Route exact path="/article-bet" component={withRouter(ArticleBet)} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(main(), document.getElementById('root'));