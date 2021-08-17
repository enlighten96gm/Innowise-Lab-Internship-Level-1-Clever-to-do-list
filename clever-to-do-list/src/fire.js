import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAuMTzPEYYMI1UEQa5Oksq2gbsR6TRs7A4",
    authDomain: "fir-to-do-list-a161c.firebaseapp.com",
    databaseURL: "https://fir-to-do-list-a161c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fir-to-do-list-a161c",
    storageBucket: "fir-to-do-list-a161c.appspot.com",
    messagingSenderId: "122703555526",
    appId: "1:122703555526:web:5b1a946fab256ac44ca0c7",
    measurementId: "G-FKWWZ9JFF0"
  };
const fireBase = firebase.initializeApp(firebaseConfig);

export default fireBase