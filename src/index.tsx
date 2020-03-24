import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

//Updates the Meta Tag for using the current color scheme when adding to home screen on iOS
const meta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
if (meta) {
    meta.setAttribute("content", window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "white");
}

