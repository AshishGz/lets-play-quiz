import React, {useEffect, useState} from 'react';
import '../styles/quiz.css';
import Button from "@material-ui/core/Button/Button";
import StartQuizIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ViewResult from "../component/viewResult";
export default function QuizResult() {
    let history=useHistory();
    let [result,setResult]=useState(0);
    let [viewResult,setViewResult]=useState(false);

    useEffect(()=>{
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
