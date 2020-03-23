import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCkEnXr7wXs0Ob-W3itC1BFDTSxD_IT_1s",
    authDomain: "corona-pt.firebaseapp.com",
    databaseURL: "https://corona-pt.firebaseio.com",
    projectId: "corona-pt",
    storageBucket: "corona-pt.appspot.com",
    messagingSenderId: "803706534878",
    appId: "1:803706534878:web:ed1e68372205a52a123b4f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
