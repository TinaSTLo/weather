import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

// Report
import reportWebVitals from 'src/reportWebVitals';

// Global context
import { GlobalContextProvider, useGlobalStore } from 'src/contexts/globalContext';

// Router
import Router from 'src/router/router';

// Ant design
import '@csstools/normalize.css';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }
`;

/**
 * add RWD to GlobalStyle
 *
 */
const GlobalRwdStyle = () => {
    const { rwdMode } = useGlobalStore(); // RWD
    return (
        <GlobalStyle rwdMode={rwdMode} />
    );
};

/**
 * Root
 *
 * @returns {JSX.Element} JSX
 */
const Root = () => (
    <React.StrictMode>
        <GlobalContextProvider>
            <GlobalRwdStyle />
            <Router />
        </GlobalContextProvider>
    </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
