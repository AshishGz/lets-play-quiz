import React, {useEffect, useState} from 'react';
import QuizCatogery from "../component/quizCatogery";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
export default function HomePage() {

    const [userName,setUserName]=useState('');


    useEffect(()=>{

        setUserName(localStorage.getItem('_user_name')?localStorage.getItem('_user_name'):'')
    },true)


    function handleChange(event) {
        setUserName(event.target.value)

    }

    return (
        <div>
            {userName !== '' ?
                <div style={{display: 'flex', margin: 20}}>
                    Welcome {userName}
                </div> :

                <div style={{display: 'flex', margin: 20}}>

                    <TextField id="filled-basic" label="User Name" variant="filled" fullWidth={true}
                               onChange={handleChange}/>
                    <Button variant="contained" color="primary" style={{marginLeft: 20}}
                            onClick={() => localStorage.setItem('_user_name', userName)}
                    >
                        Save
                    </Button>
                </div>
            }
            <QuizCatogery/>
        </div>
    )
}
