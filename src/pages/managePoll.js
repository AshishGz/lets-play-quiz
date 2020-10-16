import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";
export default function ManagePoll() {
    let history = useHistory();
    let defaultPoll={
        "question":"",
        "optionA":"",
        "optionB":"",
        "optionC":"",
        "optionD":"",
    };

    const[poll,setPoll]=useState(defaultPoll);

    const [isLoading,setIsLoading]=useState(false);

    function handleChange(event) {
        defaultPoll[event.target.name]=event.target.value;
        setPoll(defaultPoll);

    }

    function onAddPoll() {
        setIsLoading(true);
        const firestore = firebase.firestore();
        firestore.collection("poll").add({
            question:poll.question ,
            optionA: poll.optionA,
            optionB: poll.optionB,
            optionC: poll.optionC,
            optionD: poll.optionD,
            isActive:true,
            optionA_count:0,
            optionB_count:0,
            optionC_count:0,
            optionD_count:0,

    }).then(function (value) {

            history.push('/playPoll/'+value.id);
            setIsLoading(false);
        });
    }

    return (
        <div>
            {isLoading ?
                <div>
                    <img src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif" style={{margin:'auto',display:'block'}}/>
                    <p style={{textAlign:'center'}}>Please Wait</p>
                </div>
                :
                <div>
                    <div style={{margin: '10px 10px 0px 10px'}}>
                        <TextField id="filled-basic" label="Pool Question " variant="filled" fullWidth={true} rows={3}
                                   rowsMax={5} onChange={handleChange} name="question"/>

                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'auto auto', marginLeft: 10}}>
                        <div style={{margin: '10px 10px 0px 0px'}}><TextField id="outlined-basic" label="Option A"
                                                                              variant="outlined" onChange={handleChange}
                                                                              fullWidth={true} name="optionA"/></div>
                        <div style={{margin: '10px 10px 0px 0px'}}><TextField id="outlined-basic" label="Option B"
                                                                              variant="outlined" onChange={handleChange}
                                                                              fullWidth={true} name="optionB"/></div>
                        <div style={{margin: '10px 10px 0px 0px'}}><TextField id="outlined-basic" label="Option C"
                                                                              variant="outlined" onChange={handleChange}
                                                                              fullWidth={true} name="optionC"/></div>
                        <div style={{margin: '10px 10px 0px 0px'}}><TextField id="outlined-basic" label="Option D"
                                                                              variant="outlined" onChange={handleChange}
                                                                              fullWidth={true} name="optionD"/></div>
                    </div>
                    <Button variant="contained" color="primary" onClick={onAddPoll}
                            style={{margin: '10px 10px 0px 10px'}}>
                        ADD POLL
                    </Button>
                </div>
            }
        </div>
    )
}
