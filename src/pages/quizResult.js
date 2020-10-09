import React, {useEffect, useState} from 'react';
import '../styles/quiz.css';
import Button from "@material-ui/core/Button/Button";
import StartQuizIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ViewResult from "../component/viewResult";
import * as firebase from "firebase";
export default function QuizResult() {
    const firestore = firebase.firestore();
    let history=useHistory();
    let [result,setResult]=useState(0);
    let [viewResult,setViewResult]=useState(false);

    useEffect(()=>{
        let user_nmae=localStorage.getItem('_user_name')?localStorage.getItem('_user_name'):''

        let data=history.location.state;
        firestore.collection("quiz_result").add({
            Score:data.result ,
            catogery: data.catogery.name,
            level:data.level,
            no_of_question:data.questions,
            user_name:user_nmae
        });
        setResult(history.location.state.result);
    },[true]);
    return (
        <div id="quiz">
            <h1>
                {history.location.state.isPass? 'Congartulations':'OPPS! Try Again'}

            </h1>
            <div className="circle">
                <div>{result}</div>
            </div>
            <Button
                variant="contained"
                color="secondary"
                onClick={()=>{
                    sessionStorage.removeItem('_current_quiz');
                    history.push('/')
                }}
                style={{background:'#18551b',margin:'20px auto',display:'block'}}
            >
                Play  New Quiz
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={()=>{
                    setViewResult(true)
                }}
                style={{background:'#18551b',margin:'20px auto',display:'block'}}
            >
                View Result
            </Button>
            <ViewResult open={viewResult} onDialougeClose={()=>{
                setViewResult(false)
            }} quizData={history.location.state.quizData}/>
        </div>
    )
}
