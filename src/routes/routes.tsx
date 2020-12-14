import React from 'react';
import { Route, RouteProps, Redirect, Switch } from 'react-router-dom';

import Login from '../views/login'
import Main from '../views/main';
import { useAuth } from '../services/authContext';


const Routers = () => {
    const { auth } = useAuth();

    const PrivateRoute = (props: RouteProps) => (
        auth ?
            <Route {...props} /> :
            <Redirect to="/login" />
    )

    return (
        <Switch>
            <Route path="/" exact>
                <Redirect to="/main" />
            </Route>
            <Route path="/login" component={() => (auth ? <Redirect to="/main" /> : <Login />)} />
            <PrivateRoute path="/main" component={() => <Main />} />
        </Switch>
    )
}

export default Routers;