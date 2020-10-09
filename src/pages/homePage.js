import React, {useEffect, useState} from 'react';
import QuizCatogery from "../component/quizCatogery";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import PlayersList from "../component/playesList";
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import LogoutICon from "@material-ui/icons/OutdoorGrill"
import { useHistory } from "react-router-dom";
import * as firebase from "firebase";
export default function HomePage() {
    let history=useHistory();
    const [userName,setUserName]=useState('');
    const [user_profile,setUSerInfo]=useState('');




    useEffect(()=>{

        setUserName(localStorage.getItem('_user_name')?localStorage.getItem('_user_name'):'');
        console.log()
        setUSerInfo(localStorage.getItem('_user_info')?JSON.parse(localStorage.getItem('_user_info')):'')
    },true)


    function handleChange(event) {
        setUserName(event.target.value)

    }
    function onHandleLogout() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
        localStorage.clear();
        window.location.reload();

    }

    return (
        <div>

            {userName !== '' ?
                <div style={{display: 'flex', margin: 20}}>
                    <div style={{width:'100%'}}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" src={user_profile.photoURL}></Avatar>
                                }
                                title={user_profile.displayName}
                                subheader={user_profile.email}
                                action={
                                    <IconButton aria-label="settings" onClick={onHandleLogout}>
                                        <LogoutICon />
                                    </IconButton>
                                }
                            />
                        </Card>
                    </div>
                </div> :

                <div style={{display: 'flex', margin: 20}}>
                    <Button variant="contained" color="primary" style={{marginLeft: 20}}
                            onClick={() => history.push('/signin')}
                    >
                        Login
                    </Button>
                </div>
            }
            <QuizCatogery/>
<div style={{background:'#f5f5f5',padding:20}}>
    <div style={{fontSize:18,fontWeight:700}}>Players List</div>
            <PlayersList/>
</div>
        </div>
    )
}
