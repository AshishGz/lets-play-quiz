import React, {useEffect, useState} from 'react';
import * as firebase from "firebase";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import Paper from "@material-ui/core/Paper/Paper";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

export default function PlayersList() {


    const [playersData,setPlayersData]=useState([]);
    const [isLoading,setIsLoading]=useState(true);



    useEffect(()=>{
        setTimeout(function () {
            getData();
        },3000)

    },[true]);



    function  getData() {
        let playersData=[];
        const db = firebase.firestore();
         db.collection('quiz_result').onSnapshot((snapshot) => {
           snapshot.forEach(function (value) {
               playersData.push(value.data())
           });
             setPlayersData(playersData);
             setIsLoading(false)
        });


    }
    return (
        <div style={{maxWidth:600,margin:'20px auto',display:'block'}}>
            {isLoading ? <div>Loading</div> :
                <div>
                    <TableContainer>
                        <Table  aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                    <TableCell align="right">Catogery</TableCell>
                                    <TableCell align="right">Level</TableCell>
                                    <TableCell align="right">No of Questtions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {playersData.map((data,index) =>
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {data.user_name}
                                        </TableCell>
                                        <TableCell align="right">{data.Score}</TableCell>
                                        <TableCell align="right">{data.catogery}</TableCell>
                                        <TableCell align="right">{data.level}</TableCell>
                                        <TableCell align="right">{data.no_of_question}</TableCell>
                                    </TableRow>
                                )}



                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            }
        </div>
    )
}
