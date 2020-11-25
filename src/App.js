import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import firebase from './firebase'

import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Header from './components/Header';
import New from './components/New';
import './global.css';



class App extends Component {

    state = {
        firebaseinitialized: false
    }

    componentDidMount() {
        firebase.isInitialized().then(resultado => {
            this.setState({ firebaseinitialized: resultado })
        })
    }


    render() {
        return this.state.firebaseinitialized !== false ? (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/Login' component={Login} />
                    <Route exact path='/Dashboard' component={Dashboard} />
                    <Route exact path='/Register' component={Register} />
                    <Route exact path='/dashboard/New' component={New} />
                </Switch>
            </BrowserRouter>
        ) : (<h1>Caregando...</h1>)
    }
}

export default App;
