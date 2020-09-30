import React from 'react';
import {catogery_json} from '../utils/catogreyJson'
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import { useHistory } from "react-router-dom";
export default function QuizCatogery() {
    let history = useHistory();
    return (

        <div style={{margin:20,background:'#f5f5f5',padding:8}}>
            <h2>Quiz Category's</h2>
            <Grid container  spacing={2}>


            {catogery_json.map((item,key)=>(
                <Grid key={key} item style={{padding:0}}>
                    <Card
                        onClick={()=>history.push('/category/'+item.id)}
                        style={{padding:10,margin:'10px 10px 10px 10px',background:item.background,color:'#ffffff',cursor:'pointer'}}>{item.name}</Card>
                </Grid>

            ))}
            </Grid>
        </div>
    )

}
