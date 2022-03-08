import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// router
import Guard from 'src/router/guard.js';

/**
 * Router
 *
 * @returns {JSX.Element}
 */
const Router = () => (
    <BrowserRouter >
        <Switch>
            <Guard />
        </Switch>
    </BrowserRouter>
);

export default Router;
