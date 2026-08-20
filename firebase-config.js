// firebase-config.js

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey:
        "AIzaSyDMqdl_6k3iRAx96fX8g9LUpQtcZlSTIJg",

    authDomain:
        "fame-store-ea8b7.firebaseapp.com",

    projectId:
        "fame-store-ea8b7",

    storageBucket:
        "fame-store-ea8b7.firebasestorage.app",

    messagingSenderId:
        "484192010044",

    appId:
        "1:484192010044:web:8b1c496d5baa492d74a839",

    measurementId:
        "G-YTGM3N01V6"

};


const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getFirestore(app);


export {
    app,
    auth,
    db
};
