import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// router
import Guard from 'src/router/guard.js';

/**
 * Router
 *
 * @returns {JSX.Element} JSX
 */
const Router = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Guard />
    </BrowserRouter>
);

export default Router;
