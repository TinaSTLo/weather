import React from 'react';
import ReactDOM from 'react-dom';

// css
import 'src/index.css';

import reportWebVitals from 'src/reportWebVitals';

// Global context
import { GlobalContextProvider } from 'src/contexts/globalContext';

// Router
import Router from 'src/router/router';

/**
 * Root
 *
 * @returns {JSX.Element}
 */
const Root = () => (
    <React.StrictMode>
        <GlobalContextProvider>
            <Router />
        </GlobalContextProvider>
    </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
