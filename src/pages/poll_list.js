import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
export default function PollList() {

    let history = useHistory();
    const [pollData,setPollData]=useState();
    const [pollId,setPollId]=useState();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        setTimeout(function () {
            getData();
        },1000)

    },[true]);

    function  getData() {
        let pollData_list=[];
        let pollID_list=[];
        const db = firebase.firestore();
        db.collection('poll').onSnapshot((snapshot) => {
            snapshot.forEach(function (value) {
                pollID_list.push(value.id);
                pollData_list.push(value.data())
            });
            setPollData(pollData_list);
            setPollId(pollID_list);
            setLoading(false);
        });


    }
    return (
        <div>
            {loading?<div>loding...</div>:
            <div>
                <div style={{display:'flex',justifyContent:'space-between',margin: 20}}>
                    <div>All Poll</div>
                    <Button variant="contained" color="primary"
                            onClick={() => history.push('/poll/manage')}
                    >
                        Create Poll
                    </Button>
                </div>
                {pollData.map((data,index) =>
                    <div style={{marginBotttom:20}}>
                        <Card onClick={()=>history.push('/playPoll/'+pollId[index])} style={{margin:20,padding:20,background:'#f0f8ff',cursor:'pointer'}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" style={{background:data.isActive?'#59f927':'#f9110f'}}>{index+1}</Avatar>
                                }
                                title={<div style={{fontSize:22,fontWeight:900}}>{data.question}</div>}
                            />
                            <div style={{margin:'10px 10px 0px 10px'}}>
                                <div>{data.optionA} : {data.optionA_count} </div>
                            <LinearProgress variant="determinate" value={data.optionA_count}  style={{height:10,marginTop:'10px'}}/>
                            </div>
                            <div style={{margin:'10px 10px 0px 10px'}}>
                                <div>{data.optionB} : {data.optionB_count} </div>
                            <LinearProgress variant="determinate" value={data.optionB_count}  style={{height:10,marginTop:'10px'}}/>
                            </div>
                            <div style={{margin:'10px 10px 0px 10px'}}>
                                <div>{data.optionC} : {data.optionC_count} </div>
                            <LinearProgress variant="determinate" value={data.optionC_count}  style={{height:10,marginTop:'10px'}}/>
                            </div>
                            <div style={{margin:'10px 10px 0px 10px'}}>
                                <div>{data.optionD} : {data.optionD_count} </div>
                            <LinearProgress variant="determinate" value={data.optionD_count}  style={{height:10,marginTop:'10px'}}/>
                            </div>

                        </Card>
                    </div>
                )}
            </div>
            }
        </div>
    )
}
