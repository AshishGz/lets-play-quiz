import React, {useEffect, useState} from 'react';
import Question from "../component/question";
import '../styles/quiz.css'
import axios from 'axios';
import {API_BASE_URL} from "../config";
import Button from "@material-ui/core/Button/Button";
import PrevIocn from "@material-ui/icons/ArrowLeft";
import NexIocn from "@material-ui/icons/ArrowRight";
import FinishIocn from "@material-ui/icons/CancelScheduleSend";
import { useHistory,useParams } from "react-router-dom";
import {catogery_json} from "../utils/catogreyJson";
export default function QuizPage() {
    let history=useHistory();
    let { catogeryId,level,number }=useParams();
    const [quizData,setQuizzData]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [answerChange,SetAnswerChange]=useState(true);
    const [questionNo,setQuestionNo]=useState(0);
const [catogeryName,setCatogery]=useState('');



    useEffect(()=>
    {
        let cat=catogery_json.filter((value)=>{
            return value.id==catogeryId;
        });
        setCatogery(cat[0]);
     getQuizata();
    },true);

    function getQuizata() {
        let quizData=sessionStorage.getItem('_current_quiz');
        if(quizData) {
            setQuizzData(JSON.parse(quizData));
            setIsLoading(false);
        }else {
            let url=API_BASE_URL + '?amount='+number+'&category='+catogeryId;
            if(level!='any'){
                url=url+'&difficulty='+level;
            }
            axios.get(url)
                .then(function (response) {
                    // handle success
                    createFinalQuiz(response.data.results);


                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }

    }

    function createFinalQuiz(data) {
        console.log(data);
        let newQuiz=[];
        data.forEach(function (value) {

            value.answers=value.incorrect_answers;
            value.answers.push(value.correct_answer);
            value.answers=shuffle(value.answers);
            newQuiz.push(value);

        });
        setQuizzData(newQuiz);
        setIsLoading(false);
        sessionStorage.setItem('_current_quiz',JSON.stringify(newQuiz));
        console.log(newQuiz);
    }
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;


            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    function handleUserAnswer(ans) {
        quizData[questionNo].userAnswer=ans;
        setQuizzData(quizData);
        SetAnswerChange(!answerChange);
    }

    function onFinishQuiz() {
        let count=0;
        quizData.forEach(function (quiz) {
            if(quiz.correct_answer==quiz.userAnswer){
                count++
            }
        });
        history.push('/result',
            {"result":(count*10),"isPass":count>4,"quizData":quizData,"level":level,"questions":quizData.length,"catogery":catogeryName});
        console.log('quiz');
        console.log(count);
    }


    return(
        <div className="quizWrapper">
            {isLoading ? <div>Please Wait, Your Quiz is Loading .... </div> :
                <div>
                    <div style={{marginTop: 20}}>
                        <Question quiz={quizData[questionNo]} handleUserAnswer={handleUserAnswer} answerChange={answerChange}/>
                    </div>
                    <div className="bottomWrapper">
                        <Button
                            variant="outlined"
                            color="secondary"
                            disabled={questionNo==0}
                            onClick={()=>setQuestionNo(questionNo - 1)}
                            startIcon={<PrevIocn />}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained" color="primary" disableElevation
                            startIcon={<FinishIocn />}
                            onClick={onFinishQuiz}
                        >
                            Finish Quiz
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={questionNo==(quizData.length-1)}
                            onClick={()=>setQuestionNo(questionNo + 1)}
                            startIcon={<NexIocn />}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            }

        </div>
    )
}
