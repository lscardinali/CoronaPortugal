import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Plugins } from '@capacitor/core';
import { updateUniqueHits } from './services/firestore';
import ReactGA from 'react-ga';

const { Storage } = Plugins;

ReactGA.initialize('UA-67205656-4');

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();

//Updates the Meta Tag for using the current color scheme when adding to home screen on iOS
const meta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
if (meta) {
    meta.setAttribute("content", window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "white");
}

const checkForFirstAccess = async () => {
    const ret = await Storage.get({ key: 'firstAccess' });
    if (ret.value === null) {
        updateUniqueHits();
    }
}

checkForFirstAccess();