import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Guard from '../router/guard.js';

const Router = () => (
    <BrowserRouter >
        <Switch>
            <Guard />
        </Switch>
    </BrowserRouter>
)
export default Router;
