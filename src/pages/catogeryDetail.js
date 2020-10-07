import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import StartQuizIcon from '@material-ui/icons/PlayArrow'
import DiffcultIcon from '@material-ui/icons/Label'
import Card from "@material-ui/core/Card/Card";
import {catogery_json} from "../utils/catogreyJson";
import { useHistory } from "react-router-dom";
import DiffucltyLevelSelect from "../component/diffucltyLevelSelect";
import NoOFQuestions from "../component/noOfQuestions";
export default function CatogeryDetail() {
    let history=useHistory();
    let { id } = useParams();
    const [lavel,setlavel]=useState('any');
    const [numberOfQuestion,setNumberOfQuestion]=useState(10);
    const [catogery,setCatogery]=useState({"name":"","id":""});
    const [selectDiffultLevel,setSelectDiffultLevel]=useState(false);
    const [selectNoOfQuestions,setSelectNoOfQuestions]=useState(false);

    useEffect(()=>{
        let cat=catogery_json.filter((value)=>{
            return value.id==id;
        });
        setCatogery(cat[0]);
    },[true]);

    function handleLevel(level) {
        setlavel(level);
        console.log(level)
    }
    function handleNoOfQuestions(no) {
        setNumberOfQuestion(no);
        console.log(no)
    }


    return(
        <div style={{margin:30}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{fontSize:24,fontWeight:900,padding:'16px'}}>{catogery.name}</div>
            </div>
            <div style={{fontSize:14,fontWeight:600,padding:'16px'}}>
                To play quiz , Please configure tyoe of quiz you want to play
            </div>
            <div style={{padding:'16px',background:'#f5f5f5'}}>
                <div style={{fontSize:14,fontWeight:600}}>Your Quiz Configuration :</div>
                <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>




                            <Card
                                onClick={()=>setSelectNoOfQuestions(true)}
                                style={{padding:10,margin:'10px 10px 10px 10px',textAlign:'center',cursor:'pointer'}}>

                                <div style={{fontSize:22,fontWeight:600}}>{numberOfQuestion}</div>
                                <div style={{fontSize:16,fontWeight:600}}>questions</div>

                            </Card>


                        <Card
                            onClick={()=>setSelectDiffultLevel(true)}
                            style={{padding:10,margin:'10px 10px 10px 10px',textAlign:'center',cursor:'pointer'}}>
                            <div><DiffcultIcon/></div>
                            <div style={{fontSize:22,fontWeight:600}}>{lavel}</div>
                        </Card>

                </div>
            </div>
            <Button
                variant="contained"
                color="secondary"
                onClick={()=>{
                     sessionStorage.removeItem('_current_quiz');
                    history.push('/play/'+id+'/'+lavel.toLocaleLowerCase()+'/'+numberOfQuestion)
                }}
                style={{background:'#18551b',margin:'20px auto'}}
                startIcon={<StartQuizIcon />}
            >
                Start Quiz
            </Button>
            <DiffucltyLevelSelect open={selectDiffultLevel} onDialougeClose={()=>setSelectDiffultLevel(false)}

            onSetLevel={handleLevel}
            />
            <NoOFQuestions open={selectNoOfQuestions} onDialougeClose={()=>setSelectNoOfQuestions(false)}

            onSetQuestions={handleNoOfQuestions}
            />

        </div>
    )
}
