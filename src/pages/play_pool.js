import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import Chip from "@material-ui/core/Chip/Chip";
export default function PlayPoll() {


    const [poll,SetPoll]=useState();
    const[loading,setLoading]=useState(true);



    useEffect(()=>{
        setTimeout(function () {
            getPool();
        },1000)

    },[true]);


    function  getPool(){
        const db = firebase.firestore();
        db.collection('poll').doc('A5qMEXR2NDTbznfMQN8D').get()
            .then(snapshot => {

                console.log(snapshot.data());
                SetPoll(snapshot.data());setLoading(false);

            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

    }

    function addPoolCOunt(type,count) {
        const db = firebase.firestore();
        db.collection("poll").doc('A5qMEXR2NDTbznfMQN8D').update({



            optionA_count:1,




        }).then(function (value) {
            alert('success')

        })

            .catch(function (error) {
            console.log(error);
        })

    }
    return (
        <div>
            {loading?<div>loading...</div>:
                <div>
                    <div style={{fontSize:22,fontWeight:900,margin:'10px 10px 0px 10px'}}> {poll.question}</div>
                    <div style={{display:'grid',gridTemplateColumns:'auto auto',marginLeft:10}}>
                    <div style={{margin:'10px 10px 0px 0px'}}><Chip label={poll.optionA}  clickable variant="outlined" style={{width:'100%'}} onClick={()=>addPoolCOunt('',1)}/></div>
                    <div style={{margin:'10px 10px 0px 0px'}}><Chip label={poll.optionB}  clickable variant="outlined" style={{width:'100%'}}/></div>
                    <div style={{margin:'10px 10px 0px 0px'}}style={{margin:'10px 10px 0px 0px'}}><Chip label={poll.optionC}  clickable variant="outlined" style={{width:'100%'}}/></div>
                    <div style={{margin:'10px 10px 0px 0px'}}><Chip label={poll.optionD}  clickable variant="outlined" style={{width:'100%'}}/></div>
                    </div>
                </div>
            }
        </div>
    )
}
