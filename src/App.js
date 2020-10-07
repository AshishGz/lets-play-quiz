import React, {useEffect} from 'react';
import './App.css';
import Header from "./component/header";
import Routes from "./routes";
import * as firebase from "firebase";

function App() {

    useEffect(()=>{
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDwTMl3feb8CpKwF4DG-8pO9oIKpiiOkPA",
            authDomain: "lets-play-quiz-4a243.firebaseapp.com",
            databaseURL: "https://lets-play-quiz-4a243.firebaseio.com",
            projectId: "lets-play-quiz-4a243",
            storageBucket: "lets-play-quiz-4a243.appspot.com",
            messagingSenderId: "1066696196153",
            appId: "1:1066696196153:web:eb824c21595eaa504f4de8",
            measurementId: "G-QVGW1FT88Y"
        };
        firebase.initializeApp(firebaseConfig);
    },true)
    return (
        <div>
            <Header/>
            <Routes/>
        </div>
    );
}

export default App;



